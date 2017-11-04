# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')
Rails.application.config.assets.paths << Rails.root.join("vendor","assets","bower_components")
Rails.application.config.assets.paths << Rails.root.join("vendor","assets","bower_components","bootstrap-sass-official","assets","fonts")

Rails.application.config.assets.paths << Rails.root.join('app', 'assets', 'stylesheets', 'fonts')
Rails.application.config.assets.paths << Rails.root.join('app', 'assets', 'stylesheets','fontawesome', 'fonts')
Rails.application.config.assets.paths << Rails.root.join('app', 'assets', 'angular' , 'templates')
Rails.application.config.assets.precompile << /\.(?:svg|eot|woff|ttf)$/
Rails.application.config.assets.precompile += ['*.html']