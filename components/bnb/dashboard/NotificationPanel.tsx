"use client";

import { Bell, CheckCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import {
  Notification,
  notifications as initialNotifications,
} from "@/libs/bnb/demo-data";

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function NotificationPanel({
  open,
  onClose,
}: NotificationPanelProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const markAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Mobile backdrop */}
      <button
        type="button"
        aria-label="Close notifications"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
      />

      <div className="fixed right-4 top-[76px] z-50 w-[calc(100vw-32px)] max-w-[420px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111318] shadow-2xl shadow-black/40 md:right-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white">
                Notifications
              </h2>

              {unreadCount > 0 && (
                <span className="rounded-full bg-[#f0b90b] px-2 py-0.5 text-[10px] font-semibold text-black">
                  {unreadCount}
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-gray-500">
              Stay updated with your BNB account
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/[0.06] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="flex justify-end border-b border-white/[0.06] px-4 py-2">
            <button
              type="button"
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 text-xs text-blue-400 transition hover:text-blue-300"
            >
              <CheckCheck size={14} />
              Mark all as read
            </button>
          </div>
        )}

        {/* Notifications */}
        <div className="max-h-[480px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={markAsRead}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.05]">
                <Bell size={24} className="text-gray-500" />
              </div>

              <h3 className="text-sm font-medium text-white">
                No notifications
              </h3>

              <p className="mt-1 max-w-[250px] text-xs leading-5 text-gray-500">
                You're all caught up. New account and trading updates will
                appear here.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.07] p-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-white/[0.04] py-2.5 text-xs font-medium text-gray-300 transition hover:bg-white/[0.07] hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
