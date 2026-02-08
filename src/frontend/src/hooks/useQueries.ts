import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { 
  SiteContent, 
  Rate, 
  UserRole, 
  RiderApplication, 
  DeliveryOrder, 
  CustomerDetails, 
  OrderStatus,
  RiderProfile 
} from '../backend';
import { ExternalBlob } from '../backend';
import { Principal } from '@dfinity/principal';

// Site Content Queries
export function useGetSiteContent() {
  const { actor, isFetching } = useActor();

  return useQuery<SiteContent>({
    queryKey: ['siteContent'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getSiteContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRates() {
  const { actor, isFetching } = useActor();

  return useQuery<Rate[]>({
    queryKey: ['rates'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getRates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetContactNumber() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['contactNumber'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getContactNumber();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetWhatsAppTemplate() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['whatsappTemplate'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getWhatsAppTemplate();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();

  return useQuery<UserRole>({
    queryKey: ['callerUserRole'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

// Site Content Mutations
export function useUpdateSiteContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (update: {
      servicesList?: string;
      howItWorks?: string;
      contactNumber?: string;
      whatsappTemplate?: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateSiteContent(
        update.servicesList || null,
        update.howItWorks || null,
        null,
        update.contactNumber || null,
        update.whatsappTemplate || null
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteContent'] });
      queryClient.invalidateQueries({ queryKey: ['rates'] });
      queryClient.invalidateQueries({ queryKey: ['contactNumber'] });
      queryClient.invalidateQueries({ queryKey: ['whatsappTemplate'] });
    },
  });
}

export function useAddRate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rate: Rate) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addRate(rate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rates'] });
      queryClient.invalidateQueries({ queryKey: ['siteContent'] });
    },
  });
}

export function useRemoveRate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rangeToRemove: [bigint, bigint]) => {
      if (!actor) throw new Error('Actor not available');
      return actor.removeRate(rangeToRemove);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rates'] });
      queryClient.invalidateQueries({ queryKey: ['siteContent'] });
    },
  });
}

// Rider Application
export function useApplyAsRider() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (application: {
      name: string;
      mobile: string;
      hasBike: boolean;
      area: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.applyAsRider(
        application.name,
        application.mobile,
        application.hasBike,
        application.area
      );
    },
  });
}

export function useGetRiderApplications() {
  const { actor, isFetching } = useActor();

  return useQuery<RiderApplication[]>({
    queryKey: ['riderApplications'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getRiderApplications();
    },
    enabled: !!actor && !isFetching,
  });
}

// Admin Order Management
export function useGetAllOrders() {
  const { actor, isFetching } = useActor();

  return useQuery<DeliveryOrder[]>({
    queryKey: ['allOrders'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllOrdersInternal();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order: {
      customer: CustomerDetails;
      parcelSize: string;
      distanceRange: [bigint, bigint];
      price: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createOrderInternal(
        order.customer,
        order.parcelSize,
        order.distanceRange,
        order.price
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allOrders'] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { orderId: bigint; newStatus: OrderStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateOrderStatusInternal(params.orderId, params.newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allOrders'] });
    },
  });
}

export function useAssignRider() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { orderId: bigint; riderName: string; riderContact: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateOrderWithRiderInternal(params.orderId, params.riderName, params.riderContact);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allOrders'] });
    },
  });
}

export function useUploadDeliveryProof() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { orderId: bigint; proofPhoto: ExternalBlob }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateOrderWithProofOfDeliveryInternal(params.orderId, params.proofPhoto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allOrders'] });
    },
  });
}

export function useRemoveOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.removeOrderInternal(orderId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allOrders'] });
    },
  });
}

// Rider Portal
export function useGetAssignedDeliveries() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<DeliveryOrder[]>({
    queryKey: ['assignedDeliveries', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) throw new Error('Actor or identity not available');
      return actor.getAssignedDeliveries(identity.getPrincipal());
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useUpdateDeliveryStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { caller: Principal; orderId: bigint; newStatus: OrderStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateDeliveryStatus(params.caller, params.orderId, params.newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignedDeliveries'] });
    },
  });
}

export function useUploadProofOfDelivery() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { caller: Principal; orderId: bigint; proofPhoto: ExternalBlob }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.uploadProofOfDelivery(params.caller, params.orderId, params.proofPhoto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignedDeliveries'] });
    },
  });
}

// Rider Profiles
export function useGetAllRiderProfiles() {
  const { actor, isFetching } = useActor();

  return useQuery<RiderProfile[]>({
    queryKey: ['riderProfiles'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllRiderProfilesInternal();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddRiderProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: { name: string; mobile: string; area: string; hasBike: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addRiderProfileInternal(profile.name, profile.mobile, profile.area, profile.hasBike);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['riderProfiles'] });
    },
  });
}
