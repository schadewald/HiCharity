$(document).ready(() => 
{
    $("#modal-button").click(() => 
    {
        $(".modal-body").html('');
        $.get("/users?format=json", (data) => 
        {
            data.forEach((user) => 
            {
                $(".modal-body").append(
                    `<div>
                    <span class="user-fullname">
                    ${user.fullNam}
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