using System;
using System.Text.RegularExpressions;

namespace MBVProject.Domain.ValueObjects
{
    public class PhoneNumber : IEquatable<PhoneNumber>
    {
        private static readonly Regex PhoneRegex = new Regex(
            @"^\+?[1-9]\d{1,14}$",
            RegexOptions.Compiled);

        public string Value { get; private set; }

        public PhoneNumber(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Phone number cannot be null or empty", nameof(value));

            var cleanedValue = value.Replace(" ", "").Replace("-", "").Replace("(", "").Replace(")", "");

            if (!PhoneRegex.IsMatch(cleanedValue))
                throw new ArgumentException("Invalid phone number format", nameof(value));

            Value = cleanedValue;
        }

        public static implicit operator string(PhoneNumber phone) => phone.Value;

        public bool Equals(PhoneNumber? other)
        {
            if (other is null) return false;
            return Value == other.Value;
        }

        public override bool Equals(object? obj) => Equals(obj as PhoneNumber);

        public override int GetHashCode() => Value.GetHashCode();

        public static bool operator ==(PhoneNumber? left, PhoneNumber? right)
        {
            if (left is null) return right is null;
            return left.Equals(right);
        }

        public static bool operator !=(PhoneNumber? left, PhoneNumber? right) => !(left == right);

        public override string ToString() => Value;
    }
}
