using MBVProject.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MBVProject.Domain.Interfaces
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<IEnumerable<Product>> GetFeaturedAsync();
        Task<IEnumerable<Product>> GetByCategoryAsync(Guid categoryId);
        Task<Product?> GetBySkuAsync(string sku);
        Task<Product?> GetBySlugAsync(string slug);
        Task<IQueryable<Product>> GetAllQueryableAsync();
    }
}
