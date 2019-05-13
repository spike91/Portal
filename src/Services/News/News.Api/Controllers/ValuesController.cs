using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace News.Api.Controllers
{
    public class ValuesController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return new RedirectResult("~swagger");
        }
    }
}
