declare module 'emailjs-com' {
    const emailjs: {
        init: (userId: string) => void;
        send: (
            serviceId: string,
            templateId: string,
            templateParams: { [key: string]: string | number | boolean },
            userId: string
        ) => Promise<{ text: string }>;
        sendForm: (
            serviceId: string,
            templateId: string,
            form: HTMLFormElement,
            userId: string
        ) => Promise<{ text: string }>;
    };
    export default emailjs;
}