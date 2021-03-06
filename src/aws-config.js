// WARNING: DO NOT EDIT. This file is Auto-Generated by AWS Mobile Hub. It will be overwritten.

// Copyright 2017-2018 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.

// AWS Mobile Hub Project Constants
var aws_app_analytics = 'enable';
var aws_cloud_logic = 'enable';
var aws_cloud_logic_custom = [{"id":"ysfmnigmhb","name":"bigPinkCupcake","description":"","endpoint":"https://ysfmnigmhb.execute-api.us-east-1.amazonaws.com/bigPinkCupcake","region":"us-east-1","paths":["/get-ingredient-by-prefix","/get-recipes"]}];
var aws_cognito_identity_pool_id = 'us-east-1:51819bf3-1a87-48a5-99dc-e845f9c8f19a';
var aws_cognito_region = 'us-east-1';
var aws_content_delivery = 'enable';
var aws_content_delivery_bucket = 'bigpinkcupcake-hosting-mobilehub-1807375008';
var aws_content_delivery_bucket_region = 'us-east-1';
var aws_content_delivery_cloudfront = 'enable';
var aws_content_delivery_cloudfront_domain = 'd1i7p0k88yfzf2.cloudfront.net';
var aws_mobile_analytics_app_id = '8530d10d67af474e84baff2c374b5cfd';
var aws_mobile_analytics_app_region = 'us-east-1';
var aws_project_id = '40dddaec-7c13-4d6e-9509-286eaa1dd757';
var aws_project_name = 'bigPinkCupcake';
var aws_project_region = 'us-east-1';
var aws_resource_name_prefix = 'bigpinkcupcake-mobilehub-1807375008';
var aws_sign_in_enabled = 'enable';
var aws_user_files = 'enable';
var aws_user_files_s3_bucket = 'bigpinkcupcake-userfiles-mobilehub-1807375008';
var aws_user_files_s3_bucket_region = 'us-east-1';
var aws_user_pools = 'enable';
var aws_user_pools_id = 'us-east-1_s2YZM8p2P';
var aws_user_pools_mfa_type = 'OFF';
var aws_user_pools_web_client_id = '1vn383c2uqg0n61g4vhs37s4kk';

AWS.config.region = aws_project_region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: aws_cognito_identity_pool_id
  }, {
    region: aws_cognito_region
  });
AWS.config.update({customUserAgent: 'MobileHub v0.1'});
