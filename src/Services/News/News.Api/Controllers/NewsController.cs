using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using News.Api.Model;
using News.Api.ViewModel;

namespace News.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        // GET api/v1/[controller]/items[?pageSize=3&pageIndex=10]
        [HttpGet]
        [Route("items")]
        [ProducesResponseType(typeof(PaginatedItemsViewModel<Post>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(IEnumerable<Post>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> ItemsAsync([FromQuery]int pageSize = 10, [FromQuery]int pageIndex = 0, string ids = null)
        {
            if (!string.IsNullOrEmpty(ids))
            {
                var items = new List<Post>();

                if (!items.Any())
                {
                    return BadRequest("ids value invalid. Must be comma-separated list of numbers");
                }

                return Ok(items);
            }

            var totalItems = 10;

            var itemsOnPage = new List<Post>() { new Post { Title = "Test", Text = "Test" } };

            var model = new PaginatedItemsViewModel<Post>(pageIndex, pageSize, totalItems, itemsOnPage);

            return Ok(model);
        }
        
    }
}