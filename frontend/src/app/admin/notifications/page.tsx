"use client";

import React, { useState } from 'react';
import { useMyNotifications, useSendBulkNotification, useSendIndividualNotification, useMarkNotificationRead, useDeleteNotification } from '../../../hooks/use-notifications';
import { useUser, useStaff, useDoctors } from '../../../hooks';
import { Bell, Loader2, Send, CheckCircle2, Trash2, Mail } from 'lucide-react';
import { NotificationType } from '../../../types/notification.types';

export default function NotificationsPage() {
  const { data: user } = useUser();
  const isAdmin = user?.role === 'SUPER_ADMIN';
  
  const { data: notifications, isLoading } = useMyNotifications();
  const { data: staff } = useStaff();
  const { data: doctors } = useDoctors();
  
  const markReadMutation = useMarkNotificationRead();
  const deleteMutation = useDeleteNotification();
  const sendBulkMutation = useSendBulkNotification();
  const sendIndividualMutation = useSendIndividualNotification();

  const [activeTab, setActiveTab] = useState<'inbox' | 'send'>('inbox');
  const [sendType, setSendType] = useState<'bulk' | 'individual'>('bulk');
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: NotificationType.ADMIN_MESSAGE,
    role_target: 'ALL',
    recipient_id: ''
  });

  const allUsers = [
    ...(doctors || []).map(d => ({ id: d.id, name: d.user_name, role: 'Doctor' })),
    ...(staff || []).map(s => ({ id: s.id, name: s.user_name, role: s.role }))
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (sendType === 'bulk') {
      sendBulkMutation.mutate({
        title: formData.title,
        message: formData.message,
        type: formData.type as NotificationType,
        role_target: formData.role_target
      }, {
        onSuccess: () => {
          setFormData({ ...formData, title: '', message: '' });
          alert("Notifications sent successfully!");
        }
      });
    } else {
      sendIndividualMutation.mutate({
        title: formData.title,
        message: formData.message,
        type: formData.type as NotificationType,
        recipient_id: formData.recipient_id
      }, {
        onSuccess: () => {
          setFormData({ ...formData, title: '', message: '' });
          alert("Notification sent successfully!");
        }
      });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Notification Center</h1>
            <p className="text-slate-500 text-sm mt-1">View alerts and send messages</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        {isAdmin && (
          <div className="flex border-b border-slate-100">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'inbox' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
            >
              My Inbox
            </button>
            <button
              onClick={() => setActiveTab('send')}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'send' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
            >
              Send Notifications
            </button>
          </div>
        )}

        {activeTab === 'inbox' && (
          <div className="divide-y divide-slate-100">
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : notifications?.length === 0 ? (
              <div className="p-16 text-center text-slate-500">
                <Mail className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                <p className="text-lg font-medium">You're all caught up!</p>
                <p className="text-sm mt-1">No new notifications.</p>
              </div>
            ) : (
              notifications?.map((notif) => (
                <div key={notif.id} className={`p-6 transition-colors flex gap-4 ${notif.is_read ? 'bg-white' : 'bg-blue-50/30'}`}>
                  <div className={`p-2.5 rounded-full h-fit ${
                    notif.type === 'ROSTER' ? 'bg-amber-100 text-amber-600' :
                    notif.type === 'LEAVE' ? 'bg-indigo-100 text-indigo-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <Bell className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`text-base ${notif.is_read ? 'font-medium text-slate-700' : 'font-bold text-slate-900'}`}>
                        {notif.title}
                      </h3>
                      <span className="text-xs text-slate-400">
                        {new Date(notif.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className={`text-sm ${notif.is_read ? 'text-slate-500' : 'text-slate-700'}`}>
                      {notif.message}
                    </p>
                    <div className="mt-4 flex gap-3">
                      {!notif.is_read && (
                        <button 
                          onClick={() => markReadMutation.mutate(notif.id)}
                          disabled={markReadMutation.isPending}
                          className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Mark as Read
                        </button>
                      )}
                      <button 
                        onClick={() => deleteMutation.mutate(notif.id)}
                        disabled={deleteMutation.isPending}
                        className="text-xs font-medium text-slate-400 hover:text-red-600 flex items-center gap-1.5 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {isAdmin && activeTab === 'send' && (
          <div className="p-8">
            <div className="flex gap-4 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="sendType" 
                  checked={sendType === 'bulk'} 
                  onChange={() => setSendType('bulk')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">Bulk Broadcast</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="sendType" 
                  checked={sendType === 'individual'} 
                  onChange={() => setSendType('individual')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">Individual Message</span>
              </label>
            </div>

            <form onSubmit={handleSend} className="space-y-5 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Clinic closure tomorrow"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea 
                  required
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none h-32"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Notification Type</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value as NotificationType})}
                    className="w-full border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    {Object.values(NotificationType).map(t => (
                      <option key={t} value={t}>{t.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>

                {sendType === 'bulk' ? (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
                    <select 
                      value={formData.role_target}
                      onChange={e => setFormData({...formData, role_target: e.target.value})}
                      className="w-full border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value="ALL">Everyone</option>
                      <option value="DOCTOR">All Doctors</option>
                      <option value="NURSE">All Nurses</option>
                      <option value="RECEPTIONIST">All Receptionists</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Recipient</label>
                    <select 
                      required
                      value={formData.recipient_id}
                      onChange={e => setFormData({...formData, recipient_id: e.target.value})}
                      className="w-full border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value="">Select Staff...</option>
                      {allUsers.map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={sendBulkMutation.isPending || sendIndividualMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  {sendBulkMutation.isPending || sendIndividualMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <><Send className="w-4 h-4" /> Send Notification</>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
