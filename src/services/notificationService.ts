interface Notification {
  id: string;
  memberId: string;
  type: 'renewal' | 'progress' | 'workout';
  message: string;
  date: Date;
  read: boolean;
}

class NotificationService {
  private notifications: Notification[] = [];

  // Check for upcoming membership renewals
  async checkRenewals(members: any[]): Promise<void> {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    members.forEach((member) => {
      const expiryDate = new Date(member.membershipExpiry);
      if (expiryDate <= thirtyDaysFromNow) {
        this.createNotification({
          memberId: member.id,
          type: 'renewal',
          message: `Your membership expires on ${expiryDate.toLocaleDateString()}. Please renew to continue enjoying our services.`,
          date: new Date(),
          read: false,
        });
      }
    });
  }

  // Create a new notification
  createNotification(notification: Omit<Notification, 'id'>): void {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
    };
    this.notifications.push(newNotification);
  }

  // Get notifications for a specific member
  getMemberNotifications(memberId: string): Notification[] {
    return this.notifications.filter((n) => n.memberId === memberId);
  }

  // Mark a notification as read
  markAsRead(notificationId: string): void {
    const notification = this.notifications.find((n) => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  // Delete a notification
  deleteNotification(notificationId: string): void {
    this.notifications = this.notifications.filter((n) => n.id !== notificationId);
  }
}

export const notificationService = new NotificationService(); 