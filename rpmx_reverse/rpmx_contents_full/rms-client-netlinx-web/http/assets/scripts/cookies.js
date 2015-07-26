function setCookie(name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}
function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}
function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}
function fixDate(date) {
  var base = new Date(0);
  var skew = base.getTime();
  if (skew > 0)
    date.setTime(date.getTime() - skew);
}
function clearCookie(name) {                  
         expires = new Date();
         expires.setYear(expires.getYear() - 1);
         document.cookie = name + '=null' + '; expires=' + expires; 		 
}
function clearCookies() {
         Cookies = document.cookie;
         Cookie = Cookies;
         expires = new Date();
         expires.setYear(expires.getYear() - 1);

         while(Cookie.length > 0) {
              //All cookie name-value pairs end with a semi-colon, except the last one.
              Cookie = Cookies.substr(0, Cookies.indexOf(';'));
              Cookies = Cookies.substr(Cookies.indexOf(';') + 1, Cookies.length);

              if(Cookie != '') {document.cookie = Cookie + '; expires=' + expires;}
              else {document.cookie = Cookies + '; expires=' + expires;}		 		 
         }
}