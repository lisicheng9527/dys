import { myRequest } from '../utils/request'
import { myUpload } from '../utils/upload'

//获取祈福列表
export const getList = params => myRequest('/api/blessing/getList', 'POST', {isShowLoading: false, ...params})

//查看祈福详情
export const getBlessing = params => myRequest('/api/blessing/get', 'POST', params)

//送祝福
export const wish = params => myRequest('/api/blessing/wish', 'POST', {isShowLoading: false,...params})

//发布祈福
export const issue = params => myRequest('/api/blessing/issue', 'POST', params)
//发布祈福-上传图片
export const uploadImage = filePath => myUpload('/api/upload/uploadImage', filePath)

//转发祈福
export const forward = params => myRequest('/api/blessing/forward', 'POST', params)

//转发祈福
export const deleteBlessing = params => myRequest('/api/blessing/delete', 'POST', params)

//获取祈福评论列表
export const getCommentList = params => myRequest('/api/blessing/comment/getList', 'POST', params)
//发表祈福评论
export const issueComment = params => myRequest('​/api/blessing/comment/issue', 'POST', params)
//点赞祈福评论
export const likeComment = params => myRequest('/api/blessing/comment/like', 'POST', params)
//取消点赞祈福评论
export const unlikeComment = params => myRequest('/api/blessing/comment/unlike', 'POST', params)
//回复祈福评论
export const replyComment = params => myRequest('/api/blessing/comment/reply', 'POST', params)
//获取功德榜列表
export const getRanking = params => myRequest('/api/meritlist/getRanking', 'POST', params)
//点赞功德榜
export const likeMeritlist = params => myRequest('/api/meritlist/like', 'POST', params)
//取消点赞功德榜
export const unLikeMeritlist = params => myRequest('/api/meritlist/unlike', 'POST', params)


