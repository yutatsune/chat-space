$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat-main__message-list">
          <div class="chat-main__message-list__names">
            <div class="chat-main__message-list__names__main">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__names__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__contents">
            <p class="chat-main__message-list__contents__text">
              ${message.content}
            </p>
            <img class="chat-main__message-list__contents__icon" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="chat-main__message-list">
        <div class="chat-main__message-list__names">
          <div class="chat-main__message-list__names__main">
            ${message.user_name}
          </div>
          <div class="chat-main__message-list__names__date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message-list__contents">
          <p class="chat-main__message-list__contents__text">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.chat-main__message-form__contents').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message').append(html);
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      $(".chat-main__message-form__contents__send").prop("disabled", false);
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });
});