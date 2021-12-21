using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using System;
using Asara.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Asara.API.Models;
using System.Collections.Generic;

namespace Asara.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BackupController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IConfiguration conf;

        public BackupController(DataContext dataContext, IConfiguration conf)
        {
            this.dataContext = dataContext;
            this.conf = conf;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> BackUp(int id)
        {
            var isBackup = true;
            string path;
            string folder = (await dataContext.Users.FindAsync(id)).Folder;
            List<string> messages = new List<string>();
            if (folder != null)
            {
                path = Path.Combine(folder, "Items.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("Id,Name,Price,Quentity,UnitId");
                        StringBuilder sb = new StringBuilder();
                        foreach (var item in await dataContext.Items.Select(n => new { n.Id, n.Name, n.Price, n.Quentity, n.UnitId }).ToListAsync())
                        {
                            sb.AppendFormat("{0},{1},{2},{3},{4}", item.Id, item.Name, item.Price, item.Quentity, item.UnitId);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }
                    }
                    fileStream.Close();
                }
                catch (Exception e)
                {
                    isBackup = false;
                    messages.Add(e.Message + " ===> Items");
                }
                path = Path.Combine(folder, "Account.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("Id,CreatedAt,IsIntial,LastUserMoney,Money,UserId");
                        StringBuilder sb = new StringBuilder();
                        foreach (var account in await dataContext.Account.Select(n => new { n.Id, n.CreatedAt, n.IsIntial, n.LastUserMoney, n.Money, n.UserId }).ToListAsync())
                        {
                            sb.AppendFormat("{0},{1},{2},{3},{4},{5}", account.Id, account.CreatedAt, account.IsIntial, account.LastUserMoney, account.Money, account.UserId);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }                       
                    }
                    fileStream.Close();
                }
                catch (Exception e)
                {
                    isBackup = false;
                    messages.Add(e.Message + "=====>>> Account");
                }
                path = Path.Combine(folder, "Users.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("Id,Money,NormalizedUserName,PasswordHash,UserName,SecurityStamp");
                        StringBuilder sb = new StringBuilder();
                        foreach (var user in await dataContext.Users.Select(n => new { n.Id, n.Money, n.NormalizedUserName, n.PasswordHash, n.UserName, n.SecurityStamp }).ToListAsync())
                        {
                            sb.AppendFormat("{0},{1},{2},{3},{4},{5}", user.Id, user.Money, user.NormalizedUserName, user.PasswordHash, user.UserName, user.SecurityStamp);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }
                    }
                    fileStream.Close();
                }
                catch (Exception e)
                {
                    isBackup = false;
                    messages.Add(e.Message + "======> Users");
                }
                path = Path.Combine(folder, "BillItems.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("Id,BillId,ItemId,Price,Quentity");
                        StringBuilder sb = new StringBuilder();
                        foreach (var billItems in await dataContext.BillItems.Select(n => new { n.Id, n.BillId, n.ItemId, n.Price, n.Quentity }).ToListAsync())
                        {
                            sb.AppendFormat("{0},{1},{2},{3},{4}", billItems.Id, billItems.BillId, billItems.ItemId, billItems.Price, billItems.Quentity);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }
                    }
                    fileStream.Close();
                }
                catch (Exception e)
                {
                    isBackup = false;
                    messages.Add(e.Message + "=====> BillItems");
                }
                path = Path.Combine(folder, "Bills.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("Id,ClientName,Cost,CreatedAt,Paid,Type,UserId");
                        StringBuilder sb = new StringBuilder();
                        foreach (var bill in await dataContext.Bills.Select(n => new { n.Id, n.ClientName, n.Cost, n.CreatedAt, n.Paid, n.Type, n.UserId }).ToListAsync())
                        {
                            sb.AppendFormat("{0},{1},{2},{3},{4},{5},{6}", bill.Id, bill.ClientName, bill.Cost, bill.CreatedAt, bill.Paid, bill.Type, bill.UserId);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }              
                    }
                    fileStream.Close();
                }
                catch (Exception e)
                {
                    isBackup = false;
                    messages.Add(e.Message + " =====> Bills");
                }
                path = Path.Combine(folder, "Expenses.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("Id,BillId,CreatedAt,Paid,Reason,UserId");
                        StringBuilder sb = new StringBuilder();
                        foreach (var expens in await dataContext.Expenses.Select(n => new { n.Id, n.BillId, n.CreatedAt, n.Paid, n.Reason, n.UserId }).ToListAsync())
                        {
                            sb.AppendFormat("{0},{1},{2},{3},{4},{5}", expens.Id, expens.BillId, expens.CreatedAt, expens.Paid, expens.Reason, expens.UserId);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        } 
                    }
                    fileStream.Close();
                }
                catch (Exception e)
                {
                    isBackup = false;
                    messages.Add(e.Message + "=====> Expenses");
                }
                path = Path.Combine(folder, "ExtraExpenses.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("Id,CreatedAt,Paid,Reason,UserId");
                        StringBuilder sb = new StringBuilder();
                        foreach (var extraExpens in await dataContext.ExtraExpenses.Select(n => new { n.Id, n.CreatedAt, n.Paid, n.Reason, n.UserId }).ToListAsync())
                        {
                            sb.AppendFormat("{0},{1},{2},{3},{4}", extraExpens.Id, extraExpens.CreatedAt, extraExpens.Paid, extraExpens.Reason, extraExpens.UserId);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        } 
                    }
                    fileStream.Close();
                }
                catch (Exception e)
                {
                    isBackup = false;
                    messages.Add(e.Message + "=========> ExtraExpenses");
                }
                path = Path.Combine(folder, "StockBills.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("Id,CreatedAt,Type,UserId,Worker");
                        StringBuilder sb = new StringBuilder();
                        foreach (var stockBill in await dataContext.StockBills.Select(n => new { n.Id, n.CreatedAt, n.Type, n.UserId, n.Worker }).ToListAsync())
                        {
                            sb.AppendFormat("{0},{1},{2},{3},{4}", stockBill.Id, stockBill.CreatedAt, stockBill.Type, stockBill.UserId, stockBill.Worker);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }          
                    }
                    fileStream.Close();
                }
                catch (Exception e)
                {
                    isBackup = false;
                    messages.Add(e.Message + "=======> StockBills");
                }
                path = Path.Combine(folder, "StockItems.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("Id,ItemId,Quentity,StockBillId");
                        StringBuilder sb = new StringBuilder();
                        foreach (var stockItem in await dataContext.StockItems.Select(n => new { n.Id, n.ItemId, n.Quentity, n.StockBillId }).ToListAsync())
                        {
                            sb.AppendFormat("{0},{1},{2},{3}", stockItem.Id, stockItem.ItemId, stockItem.Quentity, stockItem.StockBillId);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }  
                    }
                    fileStream.Close();
                }
                catch (Exception e)
                {
                    isBackup = false;
                    messages.Add(e.Message + "========> StockItems");
                }
                path = Path.Combine(folder, "Units.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("Id,Name");
                        StringBuilder sb = new StringBuilder();
                        foreach (var unit in await dataContext.Units.Select(n => new { n.Id, n.Name }).ToListAsync())
                        {
                            sb.AppendFormat("{0},{1}", unit.Id, unit.Name);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        } 
                    }
                    fileStream.Close();
                }
                catch (Exception e)
                {
                    isBackup = false;
                    messages.Add(e.Message + "========> Units");
                }

            }
            else
            {
                isBackup = false;
                folder = folder + " not exist";
            }

            return Ok(new { isBackup = isBackup, folder = folder });
        }

        [HttpGet("restore/{id_}")]
        public async Task<IActionResult> Restore(int id_)
        {
            string folder = (await dataContext.Users.FindAsync(id_)).Folder;
            var path = Path.Combine(folder, "Units.csv");
            var isRestore = true;
            string line;
            int id;
            List<string> messages = new List<string>();
            try
            {
                FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                using (StreamReader reader = new StreamReader(fileStream))
                {
                    Console.WriteLine(await reader.ReadLineAsync());
                    
                    while ((line = (await reader.ReadLineAsync())) != null){
                        string [] record = line.Split(',');
                        int.TryParse(record[0], out id);
                        if(await dataContext.Units.FindAsync(id) == null){
                            await dataContext.Units.AddAsync(new Unit(){
                                Id = id,
                                Name = record[1]
                            });
                        }
                    }
                }
                fileStream.Close();
            }
            catch (Exception e)
            {
                isRestore = false;
                messages.Add(e.Message + "=======> Unit");
            }
            path = Path.Combine(folder, "Items.csv");
            try
            {
                FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                using (StreamReader reader = new StreamReader(fileStream))
                {
                    Console.WriteLine(await reader.ReadLineAsync());
                    while ((line = (await reader.ReadLineAsync())) != null)
                    {
                        string[] record = line.Split(',');
                        int.TryParse(record[0], out id);
                        if(await dataContext.Items.FindAsync(id) == null)
                            await dataContext.Items.AddAsync(new Item()
                            {
                                Id = int.Parse(record[0]),
                                Name = record[1],
                                Price = double.Parse(record[2]),
                                Quentity = double.Parse(record[3]),
                                UnitId = int.Parse(record[4]),
                            });
                    }
                }
                fileStream.Close();
            }
            catch (Exception e)
            {
                isRestore = false;
                messages.Add(e.Message + "=======> Items");
            }
            path = Path.Combine(folder, "Users.csv");
            try
            {
                FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                using (StreamReader reader = new StreamReader(fileStream))
                {
                    Console.WriteLine(await reader.ReadLineAsync());
                    while ((line = (await reader.ReadLineAsync())) != null)
                    {
                        string[] record = line.Split(',');
                         int.TryParse(record[0], out id);
                        if(await dataContext.Users.FindAsync(id) == null)                        
                            await dataContext.Users.AddAsync(new User()
                            {
                                Id = int.Parse(record[0]),
                                Money = double.Parse(record[1]),
                                NormalizedUserName = record[2],
                                PasswordHash = record[3],
                                UserName = record[4],
                                SecurityStamp = record[5]
                            });
                    }
                }
                fileStream.Close();
            }
            catch (Exception e)
            {
                isRestore = false;
                messages.Add(e.Message + "=======> Users");
            }
            path = Path.Combine(folder, "Account.csv");
            try
            {
                FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                using (StreamReader reader = new StreamReader(fileStream))
                {
                    Console.WriteLine(await reader.ReadLineAsync());
                    while ((line = (await reader.ReadLineAsync())) != null)
                    {
                        string[] record = line.Split(',');
                         int.TryParse(record[0], out id);
                        if(await dataContext.Account.FindAsync(id) == null)
                            await dataContext.Account.AddAsync(new Account()
                            {
                                Id = int.Parse(record[0]),
                                CreatedAt = DateTime.Parse(record[1]),
                                IsIntial = bool.Parse(record[2]),
                                LastUserMoney = double.Parse(record[3]),
                                Money = double.Parse(record[4]),
                                UserId = int.Parse(record[5])
                            });
                    }
                }
                fileStream.Close();
            }
            catch (Exception e)
            {
                isRestore = false;
                messages.Add(e.Message + "=======> Account");
            }
            path = Path.Combine(folder, "Bills.csv");
            try
            {
                FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                using (StreamReader reader = new StreamReader(fileStream))
                {
                    Console.WriteLine(await reader.ReadLineAsync());
                    while ((line = (await reader.ReadLineAsync())) != null)
                    {
                        string[] record = line.Split(',');
                        int.TryParse(record[0], out id);
                        if(await dataContext.Bills.FindAsync(id) == null)
                            await dataContext.Bills.AddAsync(new Bill()
                            {
                                Id = int.Parse(record[0]),
                                ClientName = record[1],
                                Cost = double.Parse(record[2]),
                                CreatedAt = DateTime.Parse(record[3]),
                                Paid = double.Parse(record[4]),
                                Type = int.Parse(record[5]),
                                UserId = int.Parse(record[6])
                            });
                    }
                }
                fileStream.Close();
            }
            catch (Exception e)
            {
                isRestore = false;
                messages.Add(e.Message + "=======> Bills");
            }
            path = Path.Combine(folder, "BillItems.csv");
            try
            {
                FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                using (StreamReader reader = new StreamReader(fileStream))
                {
                    Console.WriteLine(await reader.ReadLineAsync());
                    while ((line = (await reader.ReadLineAsync())) != null)
                    {
                        string[] record = line.Split(',');
                        int.TryParse(record[0], out id);
                        if(await dataContext.BillItems.FindAsync(id) == null)
                            await dataContext.BillItems.AddAsync(new BillItem()
                            {
                                Id = int.Parse(record[0]),
                                BillId = int.Parse(record[1]),
                                ItemId = int.Parse(record[2]),
                                Price = double.Parse(record[3]),
                                Quentity = int.Parse(record[4]),
                            });
                    }
                }
                fileStream.Close();
            }
            catch (Exception e)
            {
                isRestore = false;
                messages.Add(e.Message + "=======> BillItems");
            }
            path = Path.Combine(folder, "ExtraExpenses.csv");
            try
            {
                FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                using (StreamReader reader = new StreamReader(fileStream))
                {
                    Console.WriteLine(await reader.ReadLineAsync());
                    while ((line = (await reader.ReadLineAsync())) != null)
                    {
                        string[] record = line.Split(',');
                        int.TryParse(record[0], out id);
                        if(await dataContext.BillItems.FindAsync(id) == null)
                            await dataContext.ExtraExpenses.AddAsync(new ExtraExpenses()
                            {
                                Id = int.Parse(record[0]),
                                CreatedAt = DateTime.Parse(record[1]),
                                Paid = double.Parse(record[2]),
                                Reason = record[3],
                                UserId = int.Parse(record[4])
                            });
                    }
                }
                fileStream.Close();
            }
            catch (Exception e)
            {
                isRestore = false;
                messages.Add(e.Message + "=======> ExtraExpenses");
            }
            path = Path.Combine(folder, "StockBills.csv");
            try
            {
                FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                using (StreamReader reader = new StreamReader(fileStream))
                {
                    Console.WriteLine(await reader.ReadLineAsync());
                    while ((line = (await reader.ReadLineAsync())) != null)
                    {
                        string[] record = line.Split(',');
                        int.TryParse(record[0], out id);
                        if(await dataContext.StockBills.FindAsync(id) == null)
                            await dataContext.StockBills.AddAsync(new StockBill()
                            {
                                Id = int.Parse(record[0]),
                                CreatedAt = DateTime.Parse(record[1]),
                                Type = int.Parse(record[2]),
                                UserId = int.Parse(record[3]),
                                Worker = record[4]
                            });
                    }
                }
                fileStream.Close();
            }
            catch (Exception e)
            {
                isRestore = false;
                messages.Add(e.Message + "=======> StockBills");
            }
            path = Path.Combine(folder, "StockItems.csv");
            try
            {
                FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                using (StreamReader reader = new StreamReader(fileStream))
                {
                    Console.WriteLine(await reader.ReadLineAsync());
                    while ((line = (await reader.ReadLineAsync())) != null)
                    {
                        string[] record = line.Split(',');
                        int.TryParse(record[0], out id);
                        if(await dataContext.StockItems.FindAsync(id) == null)
                            await dataContext.StockItems.AddAsync(new StockItem()
                            {
                                Id = int.Parse(record[0]),
                                ItemId = int.Parse(record[1]),
                                Quentity = int.Parse(record[2]),
                                StockBillId = int.Parse(record[3]),
                            });
                    }
                }
                fileStream.Close();
            }
            catch (Exception e)
            {
                isRestore = false;
                messages.Add(e.Message + "=======> StockBills");
            }
            
            try{
                await dataContext.SaveChangesAsync();
            }catch(Exception e){
                isRestore=false;
                messages.Add(e + "=======> SaveChanges Error");
            }
            return Ok(new { isRestore = isRestore, messages });
        }
    }
}