using Asara.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Asara.API.Data
{
    public class  DataContext : IdentityDbContext<User, Role, int, 
        IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, 
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext>  options) : base (options) {} 
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<UserRole>(userRole => 
            {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });                    
        }

        public DbSet<Item> Items{get; set;}
        public DbSet<Bill> Bills {get; set;}
        public DbSet<BillItem> BillItems{get; set;}
        public DbSet<Unit> Units{get; set;}
        public DbSet<StockBill> StockBills{get; set;}
        public DbSet<StockItem> StockItems{get; set;}

        public DbSet<Expenses> Expenses{get; set;}

        public DbSet<ExtraExpenses> ExtraExpenses{get; set;}
        public DbSet<Account> Account { get; internal set; }

        public DbSet<Shop> Shops {get; set;}
    }
}