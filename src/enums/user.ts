/**
 * const enum 将会在编译阶段被移除
 */

export const enum IdentitiesENUM {
  // 学生
  student = 0,
  // 家长
  parent = 1,
  // 教师/老师
  teacher = 2,
  // 管理员
  admin = 3,
  // 教职工
  employee = 4,
  // 培训机构学生
  agency_student = 5,
  // 培训机构教师
  agency_teacher = 6,
  // 培训机构主管理员
  agency_admin = 7,
  // 培训机构职工
  agency_employee = 8,
  // 教育管理局主主管理员
  edu_management_admin = 9,
  // 教育管理局职工
  edu_management_employee = 10,
}

export const enum UserSexENUM {
  woman = 0,
  man = 1,
  // 未知
  unknown = 2,
}

export const enum UserIdCardType {
  // 居民身份证
  idCard = 0,
  // 护照
  idCard1 = 1,
  // 港澳居民来往内地通行证
  idCard2 = 2,
  // 香港永久性居民身份证
  idCard3 = 3,
  // 澳门永久性居民身份证
  idCard4 = 4,
  // 港澳台居民居住证
  idCard5 = 5,
  // 台湾居民来往大陆通行证
  idCard6 = 6,
}
