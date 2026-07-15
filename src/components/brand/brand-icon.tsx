import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Boxes,
  ChartNoAxesColumnIncreasing,
  CheckCheck,
  Circle,
  KeyRound,
  Layers3,
  LockKeyhole,
  MessageCircle,
  MessageCircleCheck,
  Radio,
  Repeat2,
  Route,
  ShieldCheck,
  Sparkles,
  UserRoundKey,
  UsersRound,
  Vault,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  badge: BadgeCheck,
  boxes: Boxes,
  chart: ChartNoAxesColumnIncreasing,
  "check-list": CheckCheck,
  channel: Radio,
  circle: Circle,
  crystal: Sparkles,
  exchange: Repeat2,
  key: KeyRound,
  layers: Layers3,
  lightning: Zap,
  lock: LockKeyhole,
  message: MessageCircle,
  "message-check": MessageCircleCheck,
  radio: Radio,
  route: Route,
  shield: ShieldCheck,
  "shield-check": ShieldCheck,
  spark: Sparkles,
  "user-key": UserRoundKey,
  users: UsersRound,
  vault: Vault,
};

export function BrandIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name] ?? LockKeyhole;
  return <Icon aria-hidden="true" className={cn("size-5", className)} />;
}
