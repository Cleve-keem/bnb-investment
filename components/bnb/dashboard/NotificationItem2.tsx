"use client";

import {
  ArrowDownToLine,
  ArrowUpRight,
  Bell,
  Bot,
  CheckCircle2,
  ShieldAlert,
  Trash2,
} from "lucide-react";

import type { Notification } from "@/libs/bnb/demo-data";

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function NotificationItem({
  notification,
  onRead,
  onRemove,
}: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case "investment":
        return <Bot size={18} />;

      case "deposit":
        return <ArrowDownToLine size={18} />;

      case "withdrawal":
        return <ArrowUpRight size={18} />;

      case "security":
        return <ShieldAlert size={18} />;

      default:
        return <Bell size={18} />;
    }
  };

  return (
    <div
      className={`group relative border-b border-white/[0.06] transition hover:bg-white/[0.03] ${
        !notification.read ? "bg-white/[0.025]" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onRead(notification.id)}
        className="w-full p-4 pr-12 text-left"
      >
        <div className="flex gap-3">
          {/* Icon */}
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              notification.type === "security"
                ? "bg-red-500/10 text-red-400"
                : notification.type === "deposit"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : notification.type === "investment"
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-white/[0.06] text-gray-400"
            }`}
          >
            {getIcon()}
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-sm font-medium text-white">
                {notification.title}
              </h4>

              {!notification.read && (
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
              )}
            </div>

            <p className="mt-1 text-xs leading-5 text-gray-400">
              {notification.message}
            </p>

            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-500">
              <CheckCircle2 size={12} />
              {notification.time}
            </div>
          </div>
        </div>
      </button>

      {/* Delete */}
      <button
        type="button"
        aria-label={`Delete ${notification.title}`}
        onClick={() => onRemove(notification.id)}
        className="absolute right-3 top-4 rounded-lg p-2 text-gray-600 opacity-0 transition hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
