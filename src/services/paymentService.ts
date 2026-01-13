export interface PaymentMethod {
  id: string;
  name: string;
  nameEn: string;
  type: 'card' | 'cash' | 'bank_transfer' | 'digital_wallet' | 'crypto';
  icon: string;
  enabled: boolean;
  provider: string;
  description: string;
  setupRequired: boolean;
}

export interface PaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  paymentMethodId: string;
  customerEmail: string;
  description?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message: string;
  redirectUrl?: string;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'stripe',
    name: 'Kredi/Banka Kartı (Stripe)',
    nameEn: 'Credit/Debit Card (Stripe)',
    type: 'card',
    icon: '💳',
    enabled: false,
    provider: 'Stripe',
    description: 'Uluslararası kart ödemeleri - Stripe ile güvenli ödeme',
    setupRequired: true
  },
  {
    id: 'iyzico',
    name: 'Kredi/Banka Kartı (Iyzico)',
    nameEn: 'Credit/Debit Card (Iyzico)',
    type: 'card',
    icon: '💳',
    enabled: false,
    provider: 'Iyzico',
    description: 'Türkiye\'nin önde gelen ödeme sistemi',
    setupRequired: true
  },
  {
    id: 'paytr',
    name: 'Kredi/Banka Kartı (PayTR)',
    nameEn: 'Credit/Debit Card (PayTR)',
    type: 'card',
    icon: '💳',
    enabled: false,
    provider: 'PayTR',
    description: 'Türkiye\'de güvenilir ödeme çözümü',
    setupRequired: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    nameEn: 'PayPal',
    type: 'digital_wallet',
    icon: '🅿️',
    enabled: false,
    provider: 'PayPal',
    description: 'Dünya çapında güvenilir dijital cüzdan',
    setupRequired: true
  },
  {
    id: 'crypto',
    name: 'Kripto Para',
    nameEn: 'Cryptocurrency',
    type: 'crypto',
    icon: '₿',
    enabled: false,
    provider: 'CoinGate / BTCPay',
    description: 'Bitcoin, Ethereum ve diğer kripto paralarla ödeme',
    setupRequired: true
  },
  {
    id: 'cash_on_delivery',
    name: 'Kapıda Ödeme',
    nameEn: 'Cash on Delivery',
    type: 'cash',
    icon: '💵',
    enabled: true,
    provider: 'Internal',
    description: 'Ürün tesliminde nakit veya kart ile ödeme',
    setupRequired: false
  },
  {
    id: 'bank_transfer',
    name: 'Havale/EFT',
    nameEn: 'Bank Transfer',
    type: 'bank_transfer',
    icon: '🏦',
    enabled: true,
    provider: 'Internal',
    description: 'Banka hesabına havale veya EFT ile ödeme',
    setupRequired: false
  }
];

export const paymentService = {
  getAvailableMethods: (): PaymentMethod[] => {
    return paymentMethods.filter(method => method.enabled);
  },

  processPayment: async (request: PaymentRequest): Promise<PaymentResult> => {
    const method = paymentMethods.find(m => m.id === request.paymentMethodId);

    if (!method) {
      return {
        success: false,
        message: 'Geçersiz ödeme yöntemi'
      };
    }

    if (!method.enabled) {
      return {
        success: false,
        message: 'Bu ödeme yöntemi şu an kullanılamıyor'
      };
    }

    if (method.setupRequired) {
      return {
        success: false,
        message: `${method.provider} entegrasyonu için lütfen PAYMENT_SETUP.md dosyasına bakın`
      };
    }

    return {
      success: true,
      transactionId: `TXN-${Date.now()}`,
      message: 'Ödeme başarıyla alındı'
    };
  },

  getMethodsByType: (type: string): PaymentMethod[] => {
    return paymentMethods.filter(method => method.type === type);
  },

  getMethodById: (id: string): PaymentMethod | undefined => {
    return paymentMethods.find(method => method.id === id);
  },

  validatePaymentData: (request: PaymentRequest): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!request.orderId) {
      errors.push('Sipariş ID gerekli');
    }

    if (!request.amount || request.amount <= 0) {
      errors.push('Geçerli bir tutar girilmeli');
    }

    if (!request.customerEmail) {
      errors.push('E-posta adresi gerekli');
    }

    if (!request.paymentMethodId) {
      errors.push('Ödeme yöntemi seçilmeli');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
};
