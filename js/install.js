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
		UNKNOWN: "不明なエラーのため"
	};

	var translateError = function(error){
		return ERROR_MESSAGE[error.name] || ERROR_MESSAGE.UNKNOWN;
	};

	var createInstallAction = function(manifest, name){
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
