import {notifications} from "@mantine/notifications";

export const showNotification = (title: string, message: string, color: string) => {
    notifications.show({
        title: title,
        message: message,
        color: color,
        autoClose: 3000,
        withCloseButton: true
    });
}