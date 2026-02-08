import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Rate {
    largeParcelPrice: bigint;
    minDistance: bigint;
    maxDistance: bigint;
    smallParcelPrice: bigint;
}
export interface CustomerDetails {
    name: string;
    address: string;
    contactNumber: string;
    destinationLocation: string;
    pickupLocation: string;
}
export type Time = bigint;
export interface RiderProfile {
    hasBike: boolean;
    area: string;
    name: string;
    mobile: string;
    assignedOrders: Array<bigint>;
}
export interface DeliveryOrder {
    id: bigint;
    status: OrderStatus;
    customer: CustomerDetails;
    createdAt: Time;
    lastUpdated: Time;
    parcelSize: string;
    deliveryProof?: ExternalBlob;
    distanceRange: [bigint, bigint];
    price: bigint;
    riderContact?: string;
    riderAssignment?: string;
}
export interface SiteContent {
    servicesList: string;
    contactNumber: string;
    whatsappTemplate: string;
    howItWorks: string;
    rates: Array<Rate>;
}
export interface RiderApplication {
    hasBike: boolean;
    area: string;
    name: string;
    mobile: string;
    applicationTime: Time;
}
export enum OrderStatus {
    pending = "pending",
    picked = "picked",
    delivered = "delivered"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addRate(rate: Rate): Promise<void>;
    addRiderProfileInternal(name: string, mobile: string, area: string, hasBike: boolean): Promise<void>;
    applyAsRider(name: string, mobile: string, hasBike: boolean, area: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignRiderToOrderInternal(orderId: bigint, riderName: string): Promise<void>;
    createOrderInternal(customer: CustomerDetails, parcelSize: string, distanceRange: [bigint, bigint], price: bigint): Promise<bigint>;
    getAllOrdersInternal(): Promise<Array<DeliveryOrder>>;
    getAllRiderProfilesInternal(): Promise<Array<RiderProfile>>;
    getAssignedDeliveries(caller: Principal): Promise<Array<DeliveryOrder>>;
    getAssignedDeliveriesForRiderInternal(riderMobile: string): Promise<Array<DeliveryOrder>>;
    getCallerUserRole(): Promise<UserRole>;
    getContactNumber(): Promise<string>;
    getDeliveryProof(orderId: bigint): Promise<ExternalBlob | null>;
    getDeliveryProofForOrderInternal(orderId: bigint): Promise<ExternalBlob | null>;
    getOrderDetailsInternal(orderId: bigint): Promise<DeliveryOrder>;
    getRates(): Promise<Array<Rate>>;
    getRiderApplications(): Promise<Array<RiderApplication>>;
    getSiteContent(): Promise<SiteContent>;
    getWhatsAppTemplate(): Promise<string>;
    initialize(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    removeOrderInternal(orderId: bigint): Promise<void>;
    removeRate(rangeToRemove: [bigint, bigint]): Promise<void>;
    updateDeliveryStatus(caller: Principal, orderId: bigint, newStatus: OrderStatus): Promise<void>;
    updateOrderStatusInternal(orderId: bigint, newStatus: OrderStatus): Promise<void>;
    updateOrderWithProofOfDeliveryInternal(orderId: bigint, proofPhoto: ExternalBlob): Promise<void>;
    updateOrderWithRiderInternal(orderId: bigint, riderName: string, riderContact: string): Promise<void>;
    updateSiteContent(servicesList: string | null, howItWorks: string | null, rates: Array<Rate> | null, contactNumber: string | null, whatsappTemplate: string | null): Promise<void>;
    uploadDeliveryProofInternal(orderId: bigint, proofPhoto: ExternalBlob): Promise<void>;
    uploadProofOfDelivery(caller: Principal, orderId: bigint, proofPhoto: ExternalBlob): Promise<void>;
}
