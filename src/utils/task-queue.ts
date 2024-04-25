export class TaskQueue<T = any> {
  private concurrentLimit: number;
  private running = 0;
  private queue: Array<{ task: () => Promise<T>; index: number }> = [];
  private results: Array<{ index: number; value: T }> = [];
  private errors: Array<{ index: number; reason: T }> = [];
  private resolveStart: ((value: unknown) => void) | null = null;
  private started = false;

  constructor(concurrentLimit: number) {
    this.concurrentLimit = concurrentLimit;
  }

  public push(task: () => Promise<T>) {
    const index = this.queue.length;
    this.queue.push({ task, index });
  }

  public start(): Promise<{
    results: Array<{ index: number; value: T }>;
    errors: Array<{ index: number; reason: T }>;
  }> {
    if (this.started) {
      throw new Error('TaskQueue already started');
    }
    this.started = true;

    for (let i = 0; i < this.concurrentLimit; i++) {
      this.next();
    }
    return new Promise(resolve => {
      this.resolveStart = resolve;
    });
  }

  private next() {
    if (this.queue.length === 0 && this.running === 0) {
      this.resolveStart?.({ results: this.results, errors: this.errors });
      return;
    }

    if (this.running >= this.concurrentLimit || this.queue.length === 0) {
      return;
    }

    const { task, index } = this.queue.shift()!;
    this.running++;

    Promise.resolve()
      .then(task)
      .then(result => {
        this.results.push({ index, value: result });
      })
      .catch(error => {
        this.errors.push({ index, reason: error });
      })
      .finally(() => {
        this.running--;
        this.next();
      });
  }
}
