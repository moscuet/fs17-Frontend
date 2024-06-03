import { post } from "../api/ContactApi";

interface ContactFormValues {
    name: string;
    email: string;
    mobile: string;
    message: string;
}

class Service {
    async sendMessage(formValue: ContactFormValues) {
        const payload = {
            name: `${formValue.name}, ${formValue.email}`,
            email: 'mos.cuet@gmail.com', 
            mobile: formValue.mobile,
            message: formValue.message};
        return post( '/send-email', payload);
    }
}

const contactService = new Service();
export default contactService;
