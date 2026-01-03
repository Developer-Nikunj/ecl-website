"use client";

export default function PermissionGate({
  permission,
  children,
}: {
  permission: string;
  children: React.ReactNode;
}) {
  const raw =
    typeof document !== "undefined"
      ? document.cookie.split("; ").find((c) => c.startsWith("permissions="))
      : null;

  if (!raw) return null;

  const perms = JSON.parse(decodeURIComponent(raw.split("=")[1]));

  return perms.includes(permission) ? <>{children}</> : null;
}
