window.addEventListener("load", function(){
	var isInstallable = function(){
		return navigator.mozApps && navigator.mozApps.install;
	};

	var ERROR_MESSAGE = {
		DENIED: "インストールがキャンセルされたため",
		INVALID_MANIFEST: "必要な項目がマニフェストに記載されていないため",
		MANIFEST_URL_ERROR: "マニフェストを取得できなかったため",		
		NETWORK_ERROR: "マニフェストを取得できなかったため",
		MANIFEST_PARSE_ERROR: "マニフェストを処理できなかったため",
		UNKNOWN: "アプリケーションが既にインストールされているため"
	};

	var translateError = function(error){
		return ERROR_MESSAGE[error.name] || ERROR_MESSAGE.UNKNOWN;
	};

	var expandURL = function(url){
		if(url.startsWith("http")){
			return url;
		}
		if(url[0] == "/"){
			return window.location.protocol + "//" +
				window.location.host + url;
		}else{
			return window.location.toString().replace(/\/[^\/]*$/, "") +
				"/" + url;
		}
		return url;
	};

	var createInstallAction = function(manifest, name){
		manifest = expandURL(manifest);
		return function(event){
			event.preventDefault();
			if(manifest !== null){
				var response = navigator.mozApps.install(manifest);
				response.onsuccess = function(data){
					alert((name || manifest) + "をインストールしました。");
				};
				response.onerror = function(){
					var err = this.error;
					alert(translateError(err) + "、インストールできませんできした");
				};
			}
		};
	};

	if(isInstallable()){
		var link = document.getElementsByClassName("install-app");
		for(var i = 0; i < link.length; i++){
			var manifest = link[i].getAttribute("href");
			var name = link[i].getAttribute("data-app-name");
			link[i].addEventListener("click", createInstallAction(manifest, name));
		}
	}

});
