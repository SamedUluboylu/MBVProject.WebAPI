using System;

namespace MBVProject.Domain.ValueObjects
{
    public class Money : IEquatable<Money>
    {
        public decimal Amount { get; private set; }
        public string Currency { get; private set; }

        public Money(decimal amount, string currency = "USD")
        {
            if (amount < 0)
                throw new ArgumentException("Amount cannot be negative", nameof(amount));

            if (string.IsNullOrWhiteSpace(currency))
                throw new ArgumentException("Currency cannot be null or empty", nameof(currency));

            Amount = amount;
            Currency = currency.ToUpperInvariant();
        }

        public Money Add(Money other)
        {
            if (Currency != other.Currency)
                throw new InvalidOperationException($"Cannot add money with different currencies: {Currency} and {other.Currency}");

            return new Money(Amount + other.Amount, Currency);
        }

        public Money Subtract(Money other)
        {
            if (Currency != other.Currency)
                throw new InvalidOperationException($"Cannot subtract money with different currencies: {Currency} and {other.Currency}");

            return new Money(Amount - other.Amount, Currency);
        }

        public Money Multiply(decimal multiplier)
        {
            return new Money(Amount * multiplier, Currency);
        }

        public static Money operator +(Money left, Money right) => left.Add(right);
        public static Money operator -(Money left, Money right) => left.Subtract(right);
        public static Money operator *(Money money, decimal multiplier) => money.Multiply(multiplier);

        public bool Equals(Money? other)
        {
            if (other is null) return false;
            return Amount == other.Amount && Currency == other.Currency;
        }

        public override bool Equals(object? obj) => Equals(obj as Money);

        public override int GetHashCode() => HashCode.Combine(Amount, Currency);

        public static bool operator ==(Money? left, Money? right)
        {
            if (left is null) return right is null;
            return left.Equals(right);
        }

        public static bool operator !=(Money? left, Money? right) => !(left == right);

        public override string ToString() => $"{Amount:F2} {Currency}";
    }
}
