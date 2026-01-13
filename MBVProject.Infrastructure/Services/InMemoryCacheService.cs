using MBVProject.Application.Common.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MBVProject.Infrastructure.Services
{
    public class InMemoryCacheService : ICacheService
    {
        private readonly IMemoryCache _cache;
        private readonly HashSet<string> _keys = new();
        private readonly object _lock = new();

        public InMemoryCacheService(IMemoryCache cache)
        {
            _cache = cache;
        }

        public Task<T?> GetAsync<T>(string key)
        {
            _cache.TryGetValue(key, out T? value);
            return Task.FromResult(value);
        }

        public Task SetAsync<T>(string key, T value, TimeSpan? expiration = null)
        {
            var options = new MemoryCacheEntryOptions();

            if (expiration.HasValue)
            {
                options.AbsoluteExpirationRelativeToNow = expiration;
            }
            else
            {
                options.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1);
            }

            _cache.Set(key, value, options);

            lock (_lock)
            {
                _keys.Add(key);
            }

            return Task.CompletedTask;
        }

        public Task RemoveAsync(string key)
        {
            _cache.Remove(key);

            lock (_lock)
            {
                _keys.Remove(key);
            }

            return Task.CompletedTask;
        }

        public Task RemoveByPrefixAsync(string prefix)
        {
            lock (_lock)
            {
                var keysToRemove = _keys.Where(k => k.StartsWith(prefix)).ToList();

                foreach (var key in keysToRemove)
                {
                    _cache.Remove(key);
                    _keys.Remove(key);
                }
            }

            return Task.CompletedTask;
        }

        public Task<bool> ExistsAsync(string key)
        {
            return Task.FromResult(_cache.TryGetValue(key, out _));
        }
    }
}
