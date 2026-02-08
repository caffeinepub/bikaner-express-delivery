import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Principal "mo:core/Principal";
import Order "mo:core/Order";



actor {
  public type Rate = {
    minDistance : Nat;
    maxDistance : Nat;
    smallParcelPrice : Nat;
    largeParcelPrice : Nat;
  };

  module Rate {
    public func compare(rate1 : Rate, rate2 : Rate) : Order.Order {
      Nat.compare(rate1.minDistance, rate2.minDistance);
    };
  };

  public type SiteContent = {
    servicesList : Text;
    howItWorks : Text;
    rates : [Rate];
    contactNumber : Text;
    whatsappTemplate : Text;
  };

  public type RiderApplication = {
    name : Text;
    mobile : Text;
    hasBike : Bool;
    area : Text;
    applicationTime : Time.Time;
  };

  public type CustomerDetails = {
    name : Text;
    contactNumber : Text;
    address : Text;
    pickupLocation : Text;
    destinationLocation : Text;
  };

  public type OrderStatus = {
    #pending;
    #picked;
    #delivered;
  };

  public type DeliveryOrder = {
    id : Nat;
    customer : CustomerDetails;
    parcelSize : Text; // "small" / "large"
    distanceRange : (Nat, Nat);
    price : Nat;
    status : OrderStatus;
    riderAssignment : ?Text;
    riderContact : ?Text;
    deliveryProof : ?Storage.ExternalBlob;
    createdAt : Time.Time;
    lastUpdated : Time.Time;
  };

  public type RiderProfile = {
    name : Text;
    mobile : Text;
    area : Text;
    hasBike : Bool;
    assignedOrders : [Nat];
  };

  module DeliveryOrder {
    public func compare(order1 : DeliveryOrder, order2 : DeliveryOrder) : Order.Order {
      Nat.compare(order1.id, order2.id);
    };
  };

  var contentStore = Map.empty<Text, SiteContent>();
  var riderApplications = Map.empty<Text, RiderApplication>();
  var orders = Map.empty<Nat, DeliveryOrder>();
  var riders = Map.empty<Text, RiderProfile>();
  var nextOrderId = 1;
  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public shared ({ caller }) func initialize() : async () {
    if (contentStore.size() > 0) {
      Runtime.trap("Content already initialized");
    };

    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can initialize content");
    };

    let initialRates = [
      {
        minDistance = 0;
        maxDistance = 5;
        smallParcelPrice = 3900;
        largeParcelPrice = 4300;
      },
      {
        minDistance = 6;
        maxDistance = 10;
        smallParcelPrice = 4800;
        largeParcelPrice = 6000;
      },
      {
        minDistance = 11;
        maxDistance = 15;
        smallParcelPrice = 6500;
        largeParcelPrice = 7900;
      },
      {
        minDistance = 16;
        maxDistance = 20;
        smallParcelPrice = 8700;
        largeParcelPrice = 9500;
      },
    ];

    let initialContent = {
      servicesList = "Same-day & on-demand city-wide delivery of small and large parcels. All-inclusive transparent pricing, no hidden fees.";
      howItWorks = "Request a quote via WhatsApp or our online form. We will arrange your pickup and delivery within hours.";
      rates = initialRates;
      contactNumber = "+27 712345678";
      whatsappTemplate = "Hi, I'd like to request a delivery quote for a parcel. Here are the details...";
    };

    contentStore.add("default", initialContent);
  };

  public query func getSiteContent() : async SiteContent {
    switch (contentStore.get("default")) {
      case (?content) { content };
      case (null) { Runtime.trap("Site content not found") };
    };
  };

  public query func getRates() : async [Rate] {
    switch (contentStore.get("default")) {
      case (?content) { content.rates.sort() };
      case (null) { Runtime.trap("Site content not found") };
    };
  };

  public query func getContactNumber() : async Text {
    switch (contentStore.get("default")) {
      case (?content) { content.contactNumber };
      case (null) { Runtime.trap("Site content not found") };
    };
  };

  public query func getWhatsAppTemplate() : async Text {
    switch (contentStore.get("default")) {
      case (?content) { content.whatsappTemplate };
      case (null) { Runtime.trap("Site content not found") };
    };
  };

  public shared ({ caller }) func updateSiteContent(
    servicesList : ?Text,
    howItWorks : ?Text,
    rates : ?[Rate],
    contactNumber : ?Text,
    whatsappTemplate : ?Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update content");
    };

    let currentContent = switch (contentStore.get("default")) {
      case (?content) { content };
      case (null) { Runtime.trap("Site content not found") };
    };

    let updatedContent = {
      servicesList = switch (servicesList) {
        case (?newVal) { newVal };
        case (null) { currentContent.servicesList };
      };
      howItWorks = switch (howItWorks) {
        case (?newVal) { newVal };
        case (null) { currentContent.howItWorks };
      };
      rates = switch (rates) {
        case (?newVal) { newVal };
        case (null) { currentContent.rates };
      };
      contactNumber = switch (contactNumber) {
        case (?newVal) { newVal };
        case (null) { currentContent.contactNumber };
      };
      whatsappTemplate = switch (whatsappTemplate) {
        case (?newVal) { newVal };
        case (null) { currentContent.whatsappTemplate };
      };
    };

    contentStore.add("default", updatedContent);
  };

  public shared ({ caller }) func addRate(rate : Rate) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add rates");
    };

    let currentContent = switch (contentStore.get("default")) {
      case (?content) { content };
      case (null) { Runtime.trap("Site content not found") };
    };

    let existingRates = currentContent.rates;
    let newRates = existingRates.concat([rate]);
    let sortedRates = newRates.sort();

    let updatedContent = { currentContent with rates = sortedRates };
    contentStore.add("default", updatedContent);
  };

  public shared ({ caller }) func removeRate(rangeToRemove : (Nat, Nat)) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove rates");
    };

    let currentContent = switch (contentStore.get("default")) {
      case (?content) { content };
      case (null) { Runtime.trap("Site content not found") };
    };

    let filteredRates = currentContent.rates.filter(
      func(rate) {
        not (rate.minDistance == rangeToRemove.0 and rate.maxDistance == rangeToRemove.1);
      }
    );

    let updatedContent = {
      currentContent with
      rates = filteredRates;
    };
    contentStore.add("default", updatedContent);
  };

  public shared func applyAsRider(
    name : Text,
    mobile : Text,
    hasBike : Bool,
    area : Text,
  ) : async () {
    let application = {
      name;
      mobile;
      hasBike;
      area;
      applicationTime = Time.now();
    };
    riderApplications.add(mobile, application);
  };

  public query ({ caller }) func getRiderApplications() : async [RiderApplication] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view applications");
    };
    riderApplications.values().toArray();
  };

  // Admin Dashboard
  public shared ({ caller }) func createOrderInternal(
    customer : CustomerDetails,
    parcelSize : Text,
    distanceRange : (Nat, Nat),
    price : Nat,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create orders");
    };

    let orderId = nextOrderId;
    nextOrderId += 1;

    let newOrder : DeliveryOrder = {
      id = orderId;
      customer;
      parcelSize;
      distanceRange;
      price;
      status = #pending;
      riderAssignment = null;
      riderContact = null;
      deliveryProof = null;
      createdAt = Time.now();
      lastUpdated = Time.now();
    };

    orders.add(orderId, newOrder);
    orderId;
  };

  public shared ({ caller }) func assignRiderToOrderInternal(orderId : Nat, riderName : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can assign riders");
    };

    let order = switch (orders.get(orderId)) {
      case (?existingOrder) { existingOrder };
      case (null) { Runtime.trap("Order not found") };
    };

    let updatedOrder = {
      order with
      riderAssignment = ?riderName;
      lastUpdated = Time.now();
    };

    orders.add(orderId, updatedOrder);
  };

  public shared ({ caller }) func updateOrderStatusInternal(orderId : Nat, newStatus : OrderStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };

    let order = switch (orders.get(orderId)) {
      case (?existingOrder) { existingOrder };
      case (null) { Runtime.trap("Order not found") };
    };

    let updatedOrder = {
      order with
      status = newStatus;
      lastUpdated = Time.now();
    };

    orders.add(orderId, updatedOrder);
  };

  public shared ({ caller }) func uploadDeliveryProofInternal(orderId : Nat, proofPhoto : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can upload proof photos");
    };

    let order = switch (orders.get(orderId)) {
      case (?existingOrder) { existingOrder };
      case (null) { Runtime.trap("Order not found") };
    };

    let updatedOrder = {
      order with
      deliveryProof = ?proofPhoto;
      lastUpdated = Time.now();
    };

    orders.add(orderId, updatedOrder);
  };

  public query ({ caller }) func getOrderDetailsInternal(orderId : Nat) : async DeliveryOrder {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };

    switch (orders.get(orderId)) {
      case (?order) { order };
      case (null) { Runtime.trap("Order not found") };
    };
  };

  public query ({ caller }) func getAllOrdersInternal() : async [DeliveryOrder] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    orders.values().toArray();
  };

  public query ({ caller }) func getAssignedDeliveries() : async [DeliveryOrder] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view assigned deliveries");
    };

    let riderProfile = switch (riders.get(caller.toText())) {
      case (?profile) { profile };
      case (null) { Runtime.trap("Rider profile not found") };
    };

    let ordersList = riderProfile.assignedOrders.map(
      func(orderId) {
        switch (orders.get(orderId)) {
          case (?order) { order };
          case (null) { Runtime.trap("Order not found") };
        };
      }
    );
    ordersList;
  };

  public shared ({ caller }) func updateDeliveryStatus(orderId : Nat, newStatus : OrderStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update delivery status");
    };

    let riderProfile = switch (riders.get(caller.toText())) {
      case (?profile) { profile };
      case (null) { Runtime.trap("Rider profile not found") };
    };

    let order = switch (orders.get(orderId)) {
      case (?existingOrder) { existingOrder };
      case (null) { Runtime.trap("Order not found") };
    };

    if (not (order.riderAssignment == ?riderProfile.name)) {
      Runtime.trap("You are not assigned to this order");
    };

    let updatedOrder = {
      order with
      status = newStatus;
      lastUpdated = Time.now();
    };

    orders.add(orderId, updatedOrder);
  };

  public shared ({ caller }) func uploadProofOfDelivery(orderId : Nat, proofPhoto : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload proof of delivery");
    };

    let riderProfile = switch (riders.get(caller.toText())) {
      case (?profile) { profile };
      case (null) { Runtime.trap("Rider profile not found") };
    };

    let order = switch (orders.get(orderId)) {
      case (?existingOrder) { existingOrder };
      case (null) { Runtime.trap("Order not found") };
    };

    if (not (order.riderAssignment == ?riderProfile.name)) {
      Runtime.trap("You are not assigned to this order");
    };

    let updatedOrder = {
      order with
      deliveryProof = ?proofPhoto;
      lastUpdated = Time.now();
    };

    orders.add(orderId, updatedOrder);
  };

  public query ({ caller }) func getDeliveryProof(orderId : Nat) : async ?Storage.ExternalBlob {
    let order = switch (orders.get(orderId)) {
      case (?existingOrder) { existingOrder };
      case (null) { Runtime.trap("Order not found") };
    };

    let isAdmin = AccessControl.hasPermission(accessControlState, caller, #admin);
    let isAssignedRider = switch (riders.get(caller.toText())) {
      case (?profile) { order.riderAssignment == ?profile.name };
      case (null) { false };
    };

    if (not (isAdmin or isAssignedRider)) {
      Runtime.trap("Unauthorized: Only admins or assigned riders can view delivery proof");
    };

    order.deliveryProof;
  };

  public shared ({ caller }) func removeOrderInternal(orderId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove orders");
    };

    orders.remove(orderId);
  };

  public query ({ caller }) func getAllRiderProfilesInternal() : async [RiderProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view rider profiles");
    };

    riders.values().toArray();
  };

  public shared ({ caller }) func addRiderProfileInternal(name : Text, mobile : Text, area : Text, hasBike : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add rider profiles");
    };

    let profile = {
      name;
      mobile;
      area;
      hasBike;
      assignedOrders = [];
    };

    riders.add(mobile, profile);
  };

  public shared ({ caller }) func updateOrderWithRiderInternal(orderId : Nat, riderName : Text, riderContact : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can assign riders to orders");
    };

    let order = switch (orders.get(orderId)) {
      case (?existingOrder) { existingOrder };
      case (null) { Runtime.trap("Order not found") };
    };

    let updatedOrder = {
      order with
      riderAssignment = ?riderName;
      riderContact = ?riderContact;
      lastUpdated = Time.now();
    };

    orders.add(orderId, updatedOrder);
  };

  public query ({ caller }) func getAssignedDeliveriesForRiderInternal(riderMobile : Text) : async [DeliveryOrder] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view rider deliveries");
    };

    let riderProfile = switch (riders.get(riderMobile)) {
      case (?profile) { profile };
      case (null) { Runtime.trap("Rider profile not found") };
    };

    let ordersList = riderProfile.assignedOrders.map(
      func(orderId) {
        switch (orders.get(orderId)) {
          case (?order) { order };
          case (null) { Runtime.trap("Order not found") };
        };
      }
    );
    ordersList;
  };

  public shared ({ caller }) func updateOrderWithProofOfDeliveryInternal(orderId : Nat, proofPhoto : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update proof of delivery");
    };

    let order = switch (orders.get(orderId)) {
      case (?existingOrder) { existingOrder };
      case (null) { Runtime.trap("Order not found") };
    };

    let updatedOrder = {
      order with
      deliveryProof = ?proofPhoto;
      lastUpdated = Time.now();
    };

    orders.add(orderId, updatedOrder);
  };

  public query ({ caller }) func getDeliveryProofForOrderInternal(orderId : Nat) : async ?Storage.ExternalBlob {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view delivery proof");
    };

    switch (orders.get(orderId)) {
      case (?order) { order.deliveryProof };
      case (null) { Runtime.trap("Order not found") };
    };
  };
};
