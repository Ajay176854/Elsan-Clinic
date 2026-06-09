"use client";

import React from 'react';
import { useMyNotifications, useMarkNotificationRead, useDeleteNotification } from '../../../../hooks/use-notifications';
import { Bell, Loader2, CheckCircle2, Trash2 } from 'lucide-react';

export default function MyNotificationsPage() {
  const { data: notifications, isLoading } = useMyNotifications();
  const markReadMutation = useMarkNotificationRead();
  const deleteMutation = useDeleteNotification();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Notifications</h1>
            <p className="text-slate-500 text-sm mt-1">View your internal alerts and messages</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : notifications?.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Bell className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p className="text-lg font-medium">No notifications</p>
            <p className="text-sm mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications?.map((notif: any) => (
              <div 
                key={notif.id} 
                className={`p-6 flex items-start gap-4 transition-colors ${!notif.is_read ? 'bg-blue-50/30' : 'hover:bg-slate-50/50'}`}
              >
                <div className={`p-2 rounded-full mt-1 ${!notif.is_read ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-sm font-semibold ${!notif.is_read ? 'text-slate-900' : 'text-slate-700'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-xs text-slate-400">
                      {new Date(notif.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className={`text-sm ${!notif.is_read ? 'text-slate-700' : 'text-slate-500'}`}>
                    {notif.message}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  {!notif.is_read && (
                    <button 
                      onClick={() => markReadMutation.mutate(notif.id)}
                      className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg transition-colors title='Mark as Read'"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteMutation.mutate(notif.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors title='Delete'"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
