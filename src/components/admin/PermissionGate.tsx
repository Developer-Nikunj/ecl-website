"use client";

export default function PermissionGate({
  permission,
  children,
}: {
  permission: string;
  children: React.ReactNode;
}) {
  if (typeof document === "undefined") return null;

  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith("permissions="));

  if (!raw) return null;

  try {
    let value = decodeURIComponent(raw.split("=")[1]);

    // 🔥 Remove wrapping quotes if present
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    const perms: string[] = JSON.parse(value);

    return perms.includes(permission) ? <>{children}</> : null;
  } catch (err) {
    console.error("PermissionGate parse error:", err);
    return null;
  }
}
