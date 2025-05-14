const { HttpsProxyAgent } = require('https-proxy-agent');
const fs = require('fs');
const path = require("path");
const querystring = require('querystring');

const { getConfig } = require("./utils/configuration");
const { generateTransactionId } = require('./utils/transaction_id_generator');
const { fetchFile, fetchJson } = require("./utils/request");

process.env.PROXY_URL = "http://127.0.0.1:7897";

// 运行时，请确保已经准备好cookie和代理；
// 请求成功时，会将结果以当前tweetId为单位保存在当前目录下
function run() {
    const rootDir = process.argv[1].replace(/\/[^\/]+$/, '');
    const config = getConfig(rootDir);
    config.rootDir = rootDir;
    getTweet(config);
}

async function getTweet(config) {
    const proxyAgent = new HttpsProxyAgent("http://127.0.0.1:7897");
    console.log("tweet_url: %s", config.tweet_url);
    const tweetId = config.tweet_url.match(/.*?\/(\d+)/)[1];
    console.log('tweetId: %s', tweetId);
    let html;
    const local_html = `${config.rootDir}/resource/${tweetId}.html`;
    if (fs.existsSync(local_html)) {
        console.log("读取本地html文件");
        html = fs.readFileSync(local_html, 'utf-8');
    }
    else {
        html = await fetchFile(config.tweet_url, {
            headers: {
                'user-agent': config.user_agent,
            },
            agent: proxyAgent
        });
        if (html) {
            console.log('html获取成功');
            fs.writeFileSync(local_html, html);
        }
    }
    const transactionId = await generateTransactionId(html, "GET", "/i/api/graphql/xd_EMdYvB9hfZsZ6Idri0w/TweetDetail");
    // const transactionId = await generateTransactionId(html, "POST", "/i/api/1.1/jot/client_event.json");
    console.log("client-transaction-id: %s", transactionId);
    const ct0 = config.cookie.match(/ct0=(\w*);?/)[1];
    console.log("ct0: %s", ct0);
    const query = {
        "variables": `{"focalTweetId":"${tweetId}","with_rux_injections":false,"rankingMode":"Relevance","includePromotedContent":true,"withCommunity":true,"withQuickPromoteEligibilityTweetFields":true,"withBirdwatchNotes":true,"withVoice":true}`,
        "features": "{\"rweb_video_screen_enabled\":false,\"profile_label_improvements_pcf_label_in_post_enabled\":true,\"rweb_tipjar_consumption_enabled\":true,\"verified_phone_label_enabled\":false,\"creator_subscriptions_tweet_preview_api_enabled\":true,\"responsive_web_graphql_timeline_navigation_enabled\":true,\"responsive_web_graphql_skip_user_profile_image_extensions_enabled\":false,\"premium_content_api_read_enabled\":false,\"communities_web_enable_tweet_community_results_fetch\":true,\"c9s_tweet_anatomy_moderator_badge_enabled\":true,\"responsive_web_grok_analyze_button_fetch_trends_enabled\":false,\"responsive_web_grok_analyze_post_followups_enabled\":true,\"responsive_web_jetfuel_frame\":false,\"responsive_web_grok_share_attachment_enabled\":true,\"articles_preview_enabled\":true,\"responsive_web_edit_tweet_api_enabled\":true,\"graphql_is_translatable_rweb_tweet_is_translatable_enabled\":true,\"view_counts_everywhere_api_enabled\":true,\"longform_notetweets_consumption_enabled\":true,\"responsive_web_twitter_article_tweet_consumption_enabled\":true,\"tweet_awards_web_tipping_enabled\":false,\"responsive_web_grok_show_grok_translated_post\":false,\"responsive_web_grok_analysis_button_from_backend\":true,\"creator_subscriptions_quote_tweet_preview_enabled\":false,\"freedom_of_speech_not_reach_fetch_enabled\":true,\"standardized_nudges_misinfo\":true,\"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled\":true,\"longform_notetweets_rich_text_read_enabled\":true,\"longform_notetweets_inline_media_enabled\":true,\"responsive_web_grok_image_annotation_enabled\":true,\"responsive_web_enhance_cards_enabled\":false}",
        "fieldToggles": "{\"withArticleRichContentState\":true,\"withArticlePlainText\":false,\"withGrokAnalyze\":false,\"withDisallowedReplyControls\":false}"
    };
    // const respData = await fetchJson(`https://x.com/i/api/graphql/xd_EMdYvB9hfZsZ6Idri0w/TweetDetail?${encodeURIComponent(query)}`, {
    // 会导致url参数中的”=“符合也会受影响，因此，服务器才会返回参数不能为空的信息；
    // 而原本应该只需要对k和v调用该方法
    const query1 = querystring.stringify(query);
    console.log(query1);
    const respData = await fetchJson(`https://x.com/i/api/graphql/xd_EMdYvB9hfZsZ6Idri0w/TweetDetail?${query1}`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
            "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
            "content-type": "application/json",
            "x-client-transaction-id": transactionId,
            "x-csrf-token": ct0,
            "x-twitter-active-user": "yes",
            "x-twitter-auth-type": "OAuth2Session",
            "x-twitter-client-language": "en",
            "cookie": config.cookie,
            "user-agent": config.user_agent
        },
        "body": null,
        "method": "GET",
        "agent": proxyAgent
    })
    .catch(error => {
        console.log(error);
    });
    if (respData) {
        console.log("获取成功");
        fs.writeFileSync(path.resolve(__dirname, `./output/${tweetId}.json`), JSON.stringify(respData));
    }
    else {
        console.logg("获取失败");
    }
}

run();