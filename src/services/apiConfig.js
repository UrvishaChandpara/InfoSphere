import { baseUrl } from "../../config";

const url=baseUrl()

export const apis={
    //Registration
    registration:`${url}/api/registerCustomer/register`,

    //Login
    login:`${url}/api/registerCustomer/login`,

    //Profile
    getProfileData:`${url}/api/registerCustomer/getProfile`,
    updateProfile:`${url}/api/registerCustomer/update`,

    //Service
    getAllServices:`${url}/api/service/getAllServices`,
    addService:`${url}/api/service/register`,
    updateService:`${url}/api/service/update`,

    //Sub Service
    getAllSubServices:`${url}/api/subService/getAllSubServices`,
    addSubService:`${url}/api/subService/register`,
    updateSubService:`${url}/api/subService/update`,

    //Customer
    getAllCustomers:`${url}/api/customer/getAllCustomers`,
    getCustomer:`${url}/api/customer/getCustomer`,
    addCustomer:`${url}/api/customer/register`,
    updateCustomer:`${url}/api/customer/update`,
    removeCustomer:`${url}/api/customer/remove`,

    //Customer Service
    getAllCustomerServices:`${url}/api/customerService/getAllCustomerServices`,
    addCustomerServices:`${url}/api/customerService/register`,
    removeCustomerService:`${url}/api/customerService/remove`,

    //Invoice
    getInvoiceBills:`${url}/api/invoice/getAllBills`,
    getAllInvoices:`${url}/api/invoice/getAllInvoices`,
    getInvoice:`${url}/api/invoice/getInvoice`,
    addInvoice:`${url}/api/invoice/register`,
    updatePayStatus:`${url}/api/invoice/updateStatus`,
    removeInvoice:`${url}/api/invoice/remove`,

    //Generate PDF
    generatePDF:`${url}`,

    //Bill
    getAllBills:`${url}/api/bill/getAllCustomerBills`,
    getBill:`${url}/api/bill/getCustomerBill`,
    addBill:`${url}/api/bill/register`,
    updateBill:`${url}/api/bill/update`,
    removeBill:`${url}/api/bill/remove`
}