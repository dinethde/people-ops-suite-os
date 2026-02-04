// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
import { EmployeePersonalInfo, EmployeePersonalInfoUpdate } from "@root/src/services/employee";

import { PersonalInfoFormValues } from "./personalInfoSchema";

export const getChangedFields = (
  formData: PersonalInfoFormValues,
  originalData: EmployeePersonalInfo,
): Partial<EmployeePersonalInfoUpdate> => {
  if (!originalData) return {};

  const changedFields: Partial<EmployeePersonalInfoUpdate> = {};

  // Compare each field and add only if changed
  if (formData.personalEmail !== (originalData.personalEmail ?? "")) {
    changedFields.personalEmail = formData.personalEmail;
  }
  if (formData.personalPhone !== (originalData.personalPhone ?? "")) {
    changedFields.personalPhone = formData.personalPhone;
  }
  if (formData.residentNumber !== (originalData.residentNumber ?? "")) {
    changedFields.residentNumber = formData.residentNumber;
  }
  if (formData.addressLine1 !== (originalData.addressLine1 ?? "")) {
    changedFields.addressLine1 = formData.addressLine1;
  }
  if (formData.addressLine2 !== (originalData.addressLine2 ?? null)) {
    changedFields.addressLine2 = formData.addressLine2;
  }
  if (formData.city !== (originalData.city ?? "")) {
    changedFields.city = formData.city;
  }
  if (formData.postalCode !== (originalData.postalCode ?? "")) {
    changedFields.postalCode = formData.postalCode;
  }
  if (formData.stateOrProvince !== (originalData.stateOrProvince ?? null)) {
    changedFields.stateOrProvince = formData.stateOrProvince;
  }
  if (formData.country !== (originalData.country ?? "")) {
    changedFields.country = formData.country;
  }

  return changedFields;
};
