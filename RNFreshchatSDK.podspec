
Pod::Spec.new do |s|

  s.name         		 = "RNFreshchatSDK"
  s.version      		 = "4.2.2"
  s.summary      		 = "Freshchat iOS SDK - Modern messaging software that your sales and customer engagement teams will love."
  s.description  		 = <<-DESC
                   			Modern messaging software that your sales and customer engagement teams will love.
                   			DESC
  s.homepage     		 = "https://www.freshchat.com"
  s.license 	 		 = { :type => 'Commercial', :file => 'LICENSE', :text => 'See https://www.freshworks.com/terms' }
  s.author       		 = { "Freshdesk" => "support@freshchat.com" }
  s.source       		 = { :git => "https://github.com/freshworks/freshchat-ios.git", :tag => "v#{s.version}" }
  s.social_media_url     = "https://twitter.com/freshchatapp"
  s.platform     		 = :ios, "9.0"
  s.source_files 		 = "ios/*.{h,m}"
  s.static_framework             = true
  s.dependency "FreshchatSDK", '5.4.4'
  s.dependency "React"
end
