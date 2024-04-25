import { IdentitiesENUM, UserIdCardType, UserSexENUM } from '@/enums';

export interface TokenInfo {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  token_type?: string;
  scope?: string;
  code?: number;
  msg?: string;
}

/**
 * 当前校区信息（游客状态下无校区信息）
 */
export interface SchoolInfo {
  /**
   * isMainSchool 为 false 时，mainSchoolId 为 0
   * 创建学校时默认创建一个校区，isMainSchool 代表是否为主校区
   * 主校区需手动在租户端设置，默认为 false
   */
  isMainSchool: boolean;
  /**
   * 设置为主校区的校区id
   */
  mainSchoolId: number;
  organizeId: string;
  organizeName: string;
  schoolId: string;
  schoolLogo?: string;
  schoolName: string;
}

/**
 * 家长信息（有家长身份才显示此字段）
 */
export interface Parent {
  avatar: string;
  businessId: string;
  schoolBusinessId: string;
  tenantId: string;
  userBusinessId: string;
}

/**
 * 学生信息（只有学生身份才显示此字段）
 */
export interface Student {
  avatar: string;
  businessId: string;
  campusCard: string;
  classBusinessId: string;
  gradeBusinessId: string;
  photo: string;
  schoolBusinessId: string;
  tenantId: string;
  userBusinessId: string;
}

/**
 * 教师信息（只有教师身份才显示此字段）
 */
export interface Teacher {
  avatar: string;
  businessId: string;
  campusCard: string;
  photo: string;
  schoolBusinessId: string;
  tenantId: string;
  userBusinessId: string;
}

export interface UserInfo {
  address?: string;
  area?: string;
  areaCode?: string;
  // 是否实名认证过：0 未实名 1 已实名
  authentication: 0 | 1;
  avatar?: string;
  // 用户id
  birthDate: number;
  businessId: string;
  city?: string;
  cityCode?: string;
  email?: string;
  idCard: string;
  idCardType: UserIdCardType;
  lastLoginTime: number;
  mainOrganizeId: string;
  /**
   * 当前用户所选择的校区id 与 SchoolInfo.schoolId 相等
   */
  mainSchoolId: string;
  mobile: string;
  nation?: string;
  nickName?: string;
  province?: string;
  provinceCode?: string;
  sex: UserSexENUM;
  username: string;
}

export interface UserInfoData {
  isAdmin?: number;
  identities?: IdentitiesENUM[];
  user: UserInfo;
  schoolInfo: Nullable<SchoolInfo>;
  parent: Nullable<Parent>;
  student: Nullable<Student>;
  teacher: Nullable<Teacher>;
}
