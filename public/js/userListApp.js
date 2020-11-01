$(document).ready(() => 
{
    $("#modal-button").click(() => 
    {
        $(".modal-body").html('');
        $.get("/users/userList?format=json", (data) => 
        {
            data.forEach((user) => 
            {
                $(".modal-body").append(
                    `<div>
                    <span class="user-name">
                    ${user.fullName}
                    </span>
                    <div class="user-email">
                    ${user.email}
                    </div>
                    </div>`
                );
            });
        });
    });
});