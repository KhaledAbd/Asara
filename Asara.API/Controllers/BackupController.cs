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
        [HttpPost]
        public async Task<IActionResult> BackUp([FromForm] string folder)
        {
            var isBackup = true;
            string path;
            if (folder != null)
            {
                path = Path.Combine(folder, "items.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("\"Id\",\"Name\",\"Price\",\"Quentity\",\"UnitId\"");
                        StringBuilder sb = new StringBuilder();
                        foreach (var item in await dataContext.Items.Select(n => new { n.Id, n.Name, n.Price, n.Quentity, n.UnitId }).ToListAsync())
                        {
                            sb.AppendFormat("\"{0}\",\"{1}\",\"{2}\",\"{3}\",\"{4}\"", item.Id, item.Name, item.Price, item.Quentity, item.UnitId);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }
                        writer.Close();
                    }
                }
                catch (Exception e)
                {
                    isBackup = false;
                    return Ok(new { isBackup = isBackup, message = e.Message, model = "items" });
                }
                path = Path.Combine(folder, "Account.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("\"Id\",\"CreatedAt\",\"IsIntial\",\"LastUserMoney\",\"Money\",\"UserId\"");
                        StringBuilder sb = new StringBuilder();
                        foreach (var account in await dataContext.Account.Select(n => new { n.Id, n.CreatedAt, n.IsIntial, n.LastUserMoney, n.Money, n.UserId }).ToListAsync())
                        {
                            sb.AppendFormat("\"{0}\",\"{1}\",\"{2}\",\"{3}\",\"{4}\",\"{5}\"", account.Id, account.CreatedAt, account.IsIntial, account.LastUserMoney, account.Money, account.UserId);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }
                        writer.Close();
                    }
                }
                catch (Exception e)
                {
                    isBackup = false;
                    return Ok(new { isBackup = isBackup, message = e.Message });
                }
                path = Path.Combine(folder, "Users.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("\"Id\",\"Money\",\"NormalizedUserName\",\"PasswordHash\",\"UserName\",\"SecurityStamp\"");
                        StringBuilder sb = new StringBuilder();
                        foreach (var user in await dataContext.Users.Select(n => new { n.Id, n.Money, n.NormalizedUserName, n.PasswordHash, n.UserName, n.SecurityStamp }).ToListAsync())
                        {
                            sb.AppendFormat("\"{0}\",\"{1}\",\"{2}\",\"{3}\",\"{4}\",\"{5}\"", user.Id, user.Money, user.NormalizedUserName, user.PasswordHash, user.UserName, user.SecurityStamp);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }
                        writer.Close();
                    }
                }
                catch (Exception e)
                {
                    return Ok(new { isBackup = isBackup, message = e.Message });
                }
                path = Path.Combine(folder, "BillItems.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("\"Id\",\"BillId\",\"ItemId\",\"Price\",\"Quentity\"");
                        StringBuilder sb = new StringBuilder();
                        foreach (var billItems in await dataContext.BillItems.Select(n => new { n.Id, n.BillId, n.ItemId, n.Price, n.Quentity }).ToListAsync())
                        {
                            sb.AppendFormat("\"{0}\",\"{1}\",\"{2}\",\"{3}\",\"{4}\"", billItems.Id, billItems.BillId, billItems.ItemId, billItems.Price, billItems.Quentity);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }
                        writer.Close();
                    }
                }
                catch (Exception e)
                {
                    isBackup = false;
                    return Ok(new { isBackup = isBackup, message = e.Message });
                }
                path = Path.Combine(folder, "Bills.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("\"Id\",\"ClientName\",\"Cost\",\"CreatedAt\",\"Paid\",\"Type\",\"UserId\"");
                        StringBuilder sb = new StringBuilder();
                        foreach (var bill in await dataContext.Bills.Select(n => new { n.Id, n.ClientName, n.Cost, n.CreatedAt, n.Paid, n.Type, n.UserId }).ToListAsync())
                        {
                            sb.AppendFormat("\"{0}\",\"{1}\",\"{2}\",\"{3}\",\"{4}\",\"{5}\",\"{6}\"", bill.Id, bill.ClientName, bill.Cost, bill.CreatedAt, bill.Paid, bill.Type, bill.UserId);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }
                        writer.Close();
                    }
                }
                catch (Exception e)
                {
                    isBackup = false;
                    return Ok(new { isBackup = isBackup, message = e.Message });
                }
                path = Path.Combine(folder, "Expenses.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("\"Id\",\"BillId\",\"CreatedAt\",\"Paid\",\"Reason\",\"UserId\"");
                        StringBuilder sb = new StringBuilder();
                        foreach (var expens in await dataContext.Expenses.Select(n => new { n.Id, n.BillId, n.CreatedAt, n.Paid, n.Reason, n.UserId }).ToListAsync())
                        {
                            sb.AppendFormat("\"{0}\",\"{1}\",\"{2}\",\"{3}\",\"{4}\",\"{5}\"", expens.Id, expens.BillId, expens.CreatedAt, expens.Paid, expens.Reason, expens.UserId);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }
                        writer.Close();
                    }
                }
                catch (Exception e)
                {
                    isBackup = false;
                    return Ok(new { isBackup = isBackup, message = e.Message });
                }
                path = Path.Combine(folder, "ExtraExpenses.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("\"Id\",\"CreatedAt\",\"Paid\",\"Reason\",\"UserId\"");
                        StringBuilder sb = new StringBuilder();
                        foreach (var extraExpens in await dataContext.ExtraExpenses.Select(n => new { n.Id, n.CreatedAt, n.Paid, n.Reason, n.UserId }).ToListAsync())
                        {
                            sb.AppendFormat("\"{0}\",\"{1}\",\"{2}\",\"{3}\",\"{4}\"", extraExpens.Id, extraExpens.CreatedAt, extraExpens.Paid, extraExpens.Reason, extraExpens.UserId);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }
                        writer.Close();
                    }
                }
                catch (Exception e)
                {
                    isBackup = false;
                    return Ok(new { isBackup = isBackup, message = e.Message });
                }
                path = Path.Combine(folder, "StockBills.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("\"Id\",\"CreatedAt\",\"Type\",\"UserId\",\"Worker\"");
                        StringBuilder sb = new StringBuilder();
                        foreach (var stockBill in await dataContext.StockBills.Select(n => new { n.Id, n.CreatedAt, n.Type, n.UserId, n.Worker }).ToListAsync())
                        {
                            sb.AppendFormat("\"{0}\",\"{1}\",\"{2}\",\"{3}\",\"{4}\"", stockBill.Id, stockBill.CreatedAt, stockBill.Type, stockBill.UserId, stockBill.Worker);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }
                        writer.Close();
                    }
                }
                catch (Exception e)
                {
                    isBackup = false;
                    return Ok(new { isBackup = isBackup, message = e.Message });
                }
                path = Path.Combine(folder, "StockItems.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("\"Id\",\"ItemId\",\"Quentity\",\"StockBillId\"");
                        StringBuilder sb = new StringBuilder();
                        foreach (var stockItem in await dataContext.StockItems.Select(n => new { n.Id, n.ItemId, n.Quentity, n.StockBillId }).ToListAsync())
                        {
                            sb.AppendFormat("\"{0}\",\"{1}\",\"{2}\",\"{3}\"", stockItem.Id, stockItem.ItemId, stockItem.Quentity, stockItem.StockBillId);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }
                        writer.Close();
                    }
                }
                catch (Exception e)
                {
                    isBackup = false;
                    return Ok(new { isBackup = isBackup, message = e.Message });
                }
                path = Path.Combine(folder, "Units.csv");
                try
                {
                    FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    using (StreamWriter writer = new StreamWriter(fileStream))
                    {
                        await writer.WriteLineAsync("\"Id\",\"Name\"");
                        StringBuilder sb = new StringBuilder();
                        foreach (var unit in await dataContext.Units.Select(n => new { n.Id, n.Name }).ToListAsync())
                        {
                            sb.AppendFormat("\"{0}\",\"{1}\"", unit.Id, unit.Name);
                            await writer.WriteLineAsync(sb.ToString());
                            sb.Remove(0, sb.Length);
                        }
                        writer.Close();
                    }
                }
                catch (Exception e)
                {
                    isBackup = false;
                    return Ok(new { isBackup = isBackup, message = e.Message });
                }

            }
            else
            {
                isBackup = false;
                folder = folder + " not exist";
            }

            return Ok(new { isBackup = isBackup, folder = folder });
        }

        [HttpPost("restore")]
        public async Task<IActionResult> Restore([FromForm] string folder)
        {
            var path = Path.Combine(folder, "Units.csv");
            var isRestore = true;
            string line;
            try
            {
                FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                using (StreamReader reader = new StreamReader(fileStream))
                {
                    Console.WriteLine(await reader.ReadLineAsync());
                    while ((line = (await reader.ReadLineAsync())) != null){
                        string [] record = line.Split(',');
                        Console.WriteLine(record[0].Trim('\"') + "\n\n\n\n\n\n\n");
                        await dataContext.Units.AddAsync(new Unit(){
                            Id = Convert.ToInt32(record[0].Trim('\"')),
                            Name = record[1].Trim('\"')
                        });
                    }
                }
                fileStream.Close();
            }
            catch (Exception e)
            {
                isRestore = false;
                return Ok(new { isRestore = isRestore, message = e.Message, model = "unit" });
            }
            path = Path.Combine(folder, "items.csv");
            try
            {
                FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                using (StreamReader reader = new StreamReader(fileStream))
                {
                    Console.WriteLine(await reader.ReadLineAsync());
                    while ((line = (await reader.ReadLineAsync())) != null)
                    {
                        string[] record = line.Split(',');
                        await dataContext.Items.AddAsync(new Item()
                        {
                            Id = int.Parse(record[0].Trim('\"')),
                            Name = record[1].Trim('\"'),
                            Price = double.Parse(record[2].Trim('\"')),
                            Quentity = double.Parse(record[3].Trim('\"')),
                            UnitId = int.Parse(record[4].Trim('\"')),
                        });
                    }
                }
                fileStream.Close();
            }
            catch (Exception e)
            {
                isRestore = false;
                return Ok(new { isRestore = isRestore, message = e.Message, model = "items" });
            }
            await dataContext.SaveChangesAsync();
            return Ok(new { isRestore = isRestore, model = "items" });
            ;
        }
    }
}