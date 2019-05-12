using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebSPA
{
    public class AppSettings
    {
        public string IdentityUrl { get; set; }
        public string NewsUrl { get; set; }

        public string ActivateCampaignDetailFunction { get; set; }
        public bool UseCustomizationData { get; set; }
    }
}
