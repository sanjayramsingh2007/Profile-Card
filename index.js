let names=document.getElementById("nn");
let dd=document.getElementById("dd");
let dutt=document.getElementById("butt");

let email=document.getElementById("mm");
let ins=document.getElementById("ins");
let whats=document.getElementById("what");

dutt.onclick=function(){
    document.getElementById("n").textContent=names.value;
    document.getElementById("dess").textContent = dd.value;

    document.getElementById("aa").parentElement.href ="mailto:" + email.value;

    document.getElementById("aaa").parentElement.href = ins.value;

    document.getElementById("aaaa").parentElement.href ="https://wa.me/" + whats.value.replace(/\D/g, "");

}
let pro=document.getElementById("pro");
let profile=document.getElementById("profile");

profile.onchange=function(){
    pro.src = URL.createObjectURL(profile.files[0]);
}
let download = document.getElementById("download");

download.onclick = function() {

    let card = document.querySelector(".card");

    html2canvas(card).then(function(canvas) {

        let link = document.createElement("a");

        link.download = "My_Profile.png";

        link.href = canvas.toDataURL("image/png");

        link.click();

    });

};

let shareImage = document.getElementById("shareImage");

shareImage.onclick = async function() {

    let card = document.querySelector(".card");

    let canvas = await html2canvas(card);

    canvas.toBlob(async function(blob) {

        let file = new File(
            [blob],
            "My_Profile.png",
            { type: "image/png" }
        );

        if (navigator.canShare &&
            navigator.canShare({ files: [file] })) {

            await navigator.share({
                title: "My Profile",
                text: "Check out my profile!",
                files: [file]
            });

        } else {
            let link = document.createElement("a");

            link.href = canvas.toDataURL("image/png");
            link.download = "My_Profile.png";
            link.click();

            alert("Image downloaded! You can share it now.");
        }

    }, "image/png");

};

let shareLink = document.getElementById("shareLink");

shareLink.onclick = async function() {

    let params = new URLSearchParams();

    params.set("name", names.value || document.getElementById("n").textContent);
    params.set("designation", dd.value || document.getElementById("dess").textContent);
    params.set("email", email.value);
    params.set("instagram", ins.value);
    params.set("whatsapp", whats.value);

    let profileURL =
        window.location.origin +
        window.location.pathname +
        "?" + params.toString();

    try {

        await navigator.clipboard.writeText(profileURL);

        alert("Profile link copied!");

    } catch (error) {

        prompt("Copy your profile link:", profileURL);

    }

};

// Read profile information from the URL

let urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("name")) {

    names.value = urlParams.get("name") || "";
    dd.value = urlParams.get("designation") || "";
    email.value = urlParams.get("email") || "";
    ins.value = urlParams.get("instagram") || "";
    whats.value = urlParams.get("whatsapp") || "";

    // Display the shared profile
    dutt.click();

}



