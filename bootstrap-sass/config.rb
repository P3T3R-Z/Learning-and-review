# http_path = "/" 路径
# css_dir = "stylesheets"  样式
# sass_dir = "sass"  存放scss文件夹
# images_dir = "images"  存放图片文件夹
# javascripts_dir = "javascripts" 存放JS文件夹
# output_style = :compact  生成CSS格式 有压缩、{}不同方式
# relative_assets = false 是否是相对路径
# line_comments = false  生成CSS里对应scss行数


require 'bootstrap-sass'
require 'compass/import-once/activate'
# Require any additional compass plugins here.


# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "stylesheets"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "javascripts"
output_style = :compressed
line_comments = false
# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
