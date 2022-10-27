import { useAuthStore } from "@/auth/store";
import MenuItem from "@/core/types/MenuItem";

export default abstract class AppModule {
  protected constructor(
    readonly accessRight: string,
    readonly router: object,
    readonly menuItem?: MenuItem
  ) {}

  hasAccess() {
    const { userHasRight } = useAuthStore();
    return userHasRight(this.accessRight);
  }
}
