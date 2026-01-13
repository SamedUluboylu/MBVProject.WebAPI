using System;
using System.Text.RegularExpressions;

namespace MBVProject.Domain.ValueObjects
{
    public class Email : IEquatable<Email>
    {
        private static readonly Regex EmailRegex = new Regex(
            @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
            RegexOptions.Compiled | RegexOptions.IgnoreCase);

        public string Value { get; private set; }

        public Email(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Email cannot be null or empty", nameof(value));

            if (!EmailRegex.IsMatch(value))
                throw new ArgumentException("Invalid email format", nameof(value));

            Value = value.ToLowerInvariant();
        }

        public static implicit operator string(Email email) => email.Value;

        public bool Equals(Email? other)
        {
            if (other is null) return false;
            return Value == other.Value;
        }

        public override bool Equals(object? obj) => Equals(obj as Email);

        public override int GetHashCode() => Value.GetHashCode();

        public static bool operator ==(Email? left, Email? right)
        {
            if (left is null) return right is null;
            return left.Equals(right);
        }

        public static bool operator !=(Email? left, Email? right) => !(left == right);

        public override string ToString() => Value;
    }
}
