using Microsoft.AspNetCore.Razor.TagHelpers;

namespace LearnMaster
{
    public class MyInputTagHelper:TagHelper
    {
        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "input";
            output.Attributes.SetAttribute("name", "name");
        }
    }
}
