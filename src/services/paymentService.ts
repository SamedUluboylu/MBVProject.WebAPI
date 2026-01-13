export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'cash' | 'bank_transfer' | 'digital_wallet';
  icon: string;
  enabled: boolean;
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
    id: 'credit_card',
    name: 'Kredi/Banka Kartı',
    type: 'card',
    icon: '💳',
    enabled: false
  },
  {
    id: 'cash_on_delivery',
    name: 'Kapıda Ödeme',
    type: 'cash',
    icon: '💵',
    enabled: true
  },
  {
    id: 'bank_transfer',
    name: 'Havale/EFT',
    type: 'bank_transfer',
    icon: '🏦',
    enabled: true
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

    if (request.paymentMethodId === 'credit_card') {
      return {
        success: false,
        message: 'Kart ödemeleri için lütfen Stripe entegrasyonunu yapılandırın'
      };
    }

    return {
      success: true,
      transactionId: `TXN-${Date.now()}`,
      message: 'Ödeme başarıyla alındı'
    };
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
