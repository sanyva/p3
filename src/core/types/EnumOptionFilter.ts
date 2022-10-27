enum statusAll {
  All = "0",
  Active = "1",
  Paused = "2",
}

enum status {
  Active = 1,
  Paused = 2,
}

enum userStatus {
  All = "0",
  Active = "1",
  Verify = "2",
  Lock = "3",
}

enum userStatusShort {
  Active = 1,
  Lock = 3,
}

enum internal {
  No,
  Yes,
}

enum userRoles {
  Admin,
  Webmaster,
}

enum webHookType {
  "Any accepted" = 1,
  "Accepted call" = 2,
  "Accepted weblead" = 3,
}

enum tempPassword {
  "Yes (Recommended)" = 1,
  "No" = 2,
}

enum typePassword {
  "Random Password" = 0,
  "Input password" = 1,
}

enum reportGroupedGroup {
  "Webmaster" = "webmaster",
  "Campaign" = "campaign",
  "Domain" = "domain",
  "Domain & webmaster" = "domain_and_webmasters",
}

enum reportComparisonGroup {
  "Webmaster" = "webmaster",
  "Campaign" = "campaign",
  "Domain" = "domain",
}

enum reportGroupedOrder {
  "Revenue" = "amount_revenue",
  "Payout" = "amount_payout",
  "Profit" = "amount_profit",
  "Leads" = "leads_all",
  "Calls" = "calls_completed",
  "EPC" = "payout_per_session",
}

enum reportComparisonOrder {
  "1 day" = "1",
  "2 days" = "2",
  "3 days" = "3",
  "4 days" = "4",
  "5 days" = "5",
  "6 days" = "6",
  "1 week" = "7",
  "2 week" = "14",
  "3 week" = "21",
  "4 week" = "28",
  "2 month (8 weeks)" = "54",
  "3 month (12 weeks)" = "84",
}

export { tempPassword, typePassword };

export function StatusAllList() {
  return build(statusAll);
}

export function StatusList() {
  return build(status);
}

export function UserStatusList() {
  return build(userStatus);
}

export function UserStatusShortList() {
  return build(userStatusShort);
}

export function InternalList() {
  return build(internal);
}

export function WebHookType() {
  return build(webHookType);
}

export function UserRoles() {
  return build(userRoles);
}

export function TempPassword() {
  return build(tempPassword);
}

export function TypePassword() {
  return build(typePassword);
}

export function TypeGroupedGroup() {
  return build(reportGroupedGroup);
}

export function TypeGroupedOrder() {
  return build(reportGroupedOrder);
}

export function TypeComparisonGroup() {
  return build(reportComparisonGroup);
}

export function TypeComparisonOrder() {
  return build(reportComparisonOrder);
}

function build(obj: { [key: string]: number | string }) {
  const keys = Object.keys(obj).filter((key) => isNaN(Number(key)));

  return keys.map((name) => {
    return { label: name, value: obj[name] };
  });
}
