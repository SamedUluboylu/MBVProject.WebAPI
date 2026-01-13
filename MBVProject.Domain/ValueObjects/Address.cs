using System;

namespace MBVProject.Domain.ValueObjects
{
    public class Address : IEquatable<Address>
    {
        public string Street { get; private set; }
        public string City { get; private set; }
        public string State { get; private set; }
        public string ZipCode { get; private set; }
        public string Country { get; private set; }

        public Address(string street, string city, string state, string zipCode, string country)
        {
            if (string.IsNullOrWhiteSpace(street))
                throw new ArgumentException("Street cannot be null or empty", nameof(street));

            if (string.IsNullOrWhiteSpace(city))
                throw new ArgumentException("City cannot be null or empty", nameof(city));

            if (string.IsNullOrWhiteSpace(state))
                throw new ArgumentException("State cannot be null or empty", nameof(state));

            if (string.IsNullOrWhiteSpace(zipCode))
                throw new ArgumentException("ZipCode cannot be null or empty", nameof(zipCode));

            if (string.IsNullOrWhiteSpace(country))
                throw new ArgumentException("Country cannot be null or empty", nameof(country));

            Street = street;
            City = city;
            State = state;
            ZipCode = zipCode;
            Country = country;
        }

        public string GetFullAddress() => $"{Street}, {City}, {State} {ZipCode}, {Country}";

        public bool Equals(Address? other)
        {
            if (other is null) return false;
            return Street == other.Street &&
                   City == other.City &&
                   State == other.State &&
                   ZipCode == other.ZipCode &&
                   Country == other.Country;
        }

        public override bool Equals(object? obj) => Equals(obj as Address);

        public override int GetHashCode() => HashCode.Combine(Street, City, State, ZipCode, Country);

        public static bool operator ==(Address? left, Address? right)
        {
            if (left is null) return right is null;
            return left.Equals(right);
        }

        public static bool operator !=(Address? left, Address? right) => !(left == right);

        public override string ToString() => GetFullAddress();
    }
}
