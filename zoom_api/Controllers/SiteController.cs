using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace zoom.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    [Produces("application/json")]
    [Route("api/site")]
    //[ServiceFilter(typeof(UserFilter))]
    public class SiteController : ControllerBase
    {
        static readonly char[] padding = { '=' };


        [Route("getgeneratetoken/{apiKey}/{apiSecret}/{meetingNumber}/{role}")]
        public IActionResult GetGenerateToken(string apiKey, string apiSecret, string meetingNumber, string role)
        {
            var ts = (int)DateTimeOffset.UtcNow.AddMinutes(30).ToUnixTimeSeconds();
            // (ToTimestamp(DateTime.UtcNow.ToUniversalTime()) - 30000).ToString();
            string message = String.Format("{0}{1}{2}{3}", apiKey, meetingNumber, ts, role);
            apiSecret = apiSecret ?? "";
            var encoding = new System.Text.ASCIIEncoding();
            byte[] keyByte = encoding.GetBytes(apiSecret);
            byte[] messageBytesTest = encoding.GetBytes(message);
            string msgHashPreHmac = System.Convert.ToBase64String(messageBytesTest);
            byte[] messageBytes = encoding.GetBytes(msgHashPreHmac);
            using (var hmacsha256 = new HMACSHA256(keyByte))
            {
                byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
                string msgHash = System.Convert.ToBase64String(hashmessage);
                string token = String.Format("{0}.{1}.{2}.{3}.{4}", apiKey, meetingNumber, ts, role, msgHash);
                var tokenBytes = System.Text.Encoding.UTF8.GetBytes(token);
                return Ok(System.Convert.ToBase64String(tokenBytes).TrimEnd(padding));
            }
        }
        public static long ToTimestamp(DateTime value)
        {
            long epoch = (value.Ticks - 621355968000000000) / 10000;
            return epoch;
        }

    }
    public class ContactHelper
    {
        public string email { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
        public string content { get; set; }
    }
}