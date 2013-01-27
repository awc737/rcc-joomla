EasyDiscuss.module("posts",function(e){var t=this;EasyDiscuss.require().view("comment.form","post.notification").script("comments").language("COM_EASYDISCUSS_NOTIFICATION_NEW_REPLIES","COM_EASYDISCUSS_NOTIFICATION_NEW_COMMENTS","COM_EASYDISCUSS_PLEASE_SELECT_CATEGORY_DESC","COM_EASYDISCUSS_POST_TITLE_CANNOT_EMPTY","COM_EASYDISCUSS_POST_CONTENT_IS_EMPTY").done(function(){EasyDiscuss.Controller("Post.Ask",{defaultOptions:{"{submitDiscussion}":".submitDiscussion"}},function(t){return{init:function(){},"{submitDiscussion} click":function(){var t="",n=!1,r=e(".discuss-form *[name=category_id]").val();if(r==0||r.length==0){var i=e.language("COM_EASYDISCUSS_PLEASE_SELECT_CATEGORY_DESC");t+="<li>"+i+"</li>",n=!0}if(e("#ez-title").val()==""){var i=e.language("COM_EASYDISCUSS_POST_TITLE_CANNOT_EMPTY");t+="<li>"+i+"</li>",n=!0}var s=discuss.getContent();if(s==""){var i=e.language("COM_EASYDISCUSS_POST_CONTENT_IS_EMPTY");t+="<li>"+i+"</li>",n=!0}return n?(t='<div class="alert alert-error"><ul class="unstyled">'+t+"</ul></div>",e(".ask-notification").html(""),e(".ask-notification").append(t),e(document).scrollTop(e(".ask-notification").offset().top),!1):(e(this).attr("disabled","disabled"),e("#dc_submit").submit(),!1)}}}),EasyDiscuss.Controller("Post.Moderator",{defaultOptions:{"{moderatorBtn}":".moderatorBtn","{postModeratorList}":".post-moderator-list","{moderatorList}":".moderatorList"}},function(t){return{init:function(){},"{moderatorBtn} click":function(){length=t.postModeratorList().size();if(length>0)return;var e='<li style="height:10px;"><div class="discuss-loader" style="margin-left:15px;"></div></li>';t.moderatorList().append(e),EasyDiscuss.ajax("site.views.post.getModerators",{id:t.element.data("id"),category_id:t.element.data("category")},{success:function(e){t.moderatorList().empty(),t.moderatorList().append(e)},fail:function(){}})},"{postModeratorList} click":function(t){var n=e(t).data("userid"),r=e(t).data("postid");EasyDiscuss.ajax("site.views.post.ajaxModeratorAssign",{userId:n,postId:r},{success:function(t){e(".discuss-post-assign").html(t)},fail:function(t){e(".discuss-post-assign").html(t)}})}}}),EasyDiscuss.Controller("Post.Question",{defaultOptions:{id:null,view:{commentForm:"comment.form"},"{addCommentButton}":".addComment","{commentFormContainer}":".commentFormContainer","{commentNotification}":".commentNotification","{commentsList}":".commentsList","{commentLoadMore}":".commentLoadMore"}},function(t){return{init:function(){t.commentsList().implement(EasyDiscuss.Controller.Comment.List),t.commentLoadMore().length>0&&t.commentLoadMore().implement(EasyDiscuss.Controller.Comment.LoadMore,{controller:{list:t.commentsList().controller()}}),t.options.id=t.element.data("id")},"{addCommentButton} click":function(){var n=t.view.commentForm({id:t.options.id});e(n).implement(EasyDiscuss.Controller.Comment.Form,{container:t.commentFormContainer(),notification:t.commentNotification(),commentsList:t.commentsList(),loadMore:t.commentLoadMore(),termsCondition:t.options.termsCondition}),t.commentFormContainer().html(n).toggle()}}}),EasyDiscuss.Controller("PostItems",{defaultOptions:{activefiltertype:null,"{allPostsFilter}":".allPostsFilter","{newPostsFilter}":".newPostsFilter","{unResolvedFilter}":".unResolvedFilter","{unAnsweredFilter}":".unAnsweredFilter","{sortLatest}":".sortLatest","{sortPopular}":".sortPopular","{ulList}":"ul.normal","{loader}":".loader","{pagination}":".dc-pagination"}},function(e){return{init:function(){},doSort:function(t){filterType=e.options.activefiltertype,e.doFilter(filterType,t)},doFilter:function(t,n){e.options.activefiltertype=t,n===undefined&&(n="latest"),e.loader().toggle(),e.sortPopular().show(),e.sortLatest().tab("show"),e.ulList().children("li").remove(),EasyDiscuss.ajax("site.views.index.filter",{filter:t,sort:n,id:e.element.data("id"),view:e.element.data("view")},{success:function(t,n){e.loader().toggle(),e.ulList().append(t),e.pagination().html(n)},fail:function(){e.loader().toggle()}})},"{sortLatest} click":function(){e.doSort("latest")},"{sortPopular} click":function(){e.doSort("popular")},"{allPostsFilter} click":function(){e.doFilter("allposts")},"{newPostsFilter} click":function(){e.doFilter("unread"),e.sortPopular().hide()},"{unResolvedFilter} click":function(){e.doFilter("unresolved")},"{unAnsweredFilter} click":function(){e.doFilter("unanswered")}}}),EasyDiscuss.Controller("Post.CheckNewReplyComment",{defaultOptions:{id:null,interval:10,wrapper:{discuss:"#discuss-wrapper",notificationContainer:".notificationContainer",notification:".discussNotification",replyContainer:".replyContainer",commentContainer:".commentContainer",replyCount:".replyCount",commentCount:".commentCount",replyText:".replyText",commentText:".commentText"},discusswrapper:"#discuss-wrapper",notificationwrapper:".discussNotification",view:{postNotification:"post.notification"}}},function(t){return{init:function(){t.options.id=t.element.data("id"),t.getCount().done(function(e,n){EasyDiscuss.repliesCount=e,EasyDiscuss.commentsCount=n,t.autoCheck()}),e(t.options.wrapper.discuss).append('<div class="notifications top-left notificationContainer"></div>')},autoCheck:function(){t.check=setTimeout(function(){t.checkCount().done(function(){t.autoCheck()})},t.options.interval*1e3)},stopCheck:function(){clearTimeout(t.check)},getCount:function(){return EasyDiscuss.ajax("site.views.post.getUpdateCount",{id:t.options.id})},checkCount:function(){var n=e.Deferred(),r=!1,i=!1;return t.getCount().done(function(e,s){r=e-EasyDiscuss.repliesCount,i=s-EasyDiscuss.commentsCount,t.newRepliesCount=e,t.newCommentsCount=s,(r>0||i>0)&&t.notify(r,i),n.resolve()}),n},notify:function(n,r){var i=e(t.options.wrapper.notification);if(i.length<1){var s=t.view.postNotification({newReply:n,newComment:r});e(t.options.wrapper.notificationContainer).notify({message:{html:s.toHTML()},fadeOut:{enabled:!1},onClosed:function(){EasyDiscuss.repliesCount=t.newRepliesCount,EasyDiscuss.commentsCount=t.newCommentsCount}}).show()}else{var o=i.find(t.options.wrapper.replyContainer),u=i.find(t.options.wrapper.commentContainer),a=i.find(t.options.wrapper.replyCount),f=i.find(t.options.wrapper.commentCount),l=i.find(t.options.wrapper.replyText),c=i.find(t.options.wrapper.commentText);n>0&&o.length>0&&a.text(n)&&o.is(":hidden")&&o.show(),r>0&&u.length>0&&f.text(r)&&u.is(":hidden")&&u.show(),n>1&&l.text(e.language("COM_EASYDISCUSS_NOTIFICATION_NEW_REPLIES")),r>1&&c.text(e.language("COM_EASYDISCUSS_NOTIFICATION_NEW_COMMENTS"))}}}}),t.resolve()})});