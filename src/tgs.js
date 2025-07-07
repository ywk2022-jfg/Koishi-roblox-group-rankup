async function getUserMembershipId(targetUserId,groupId,apiKey) {
    let response = await fetch(`https://apis.roblox.com/cloud/v2/groups/${groupId}/join-requests?maxPageSize=10`, {
        method: "GET",
        headers: {
            "x-api-key": apiKey
        }
    });

    console.log(response.status!==200?String(response.Status) + response.statusText:"OK");
    let data = await response.json();

    if (response.status !== 200) {
        console.log(data.message);
    };

    let pageToken = data.nextPageToken || 1;
    let currentPage = data.groupJoinRequests;

    while (pageToken) {
        for (let membership of currentPage) {
            if (!membership.user || !membership.path) {continue;};

            //check to see if it's the UserId of the user we want
            let splitted = membership.user.split("/");
            let userId = splitted[splitted.length - 1];

            if (userId == targetUserId) {
                //the UserIds match! Now, return the membership ID
                let splitted = membership.path.split("/");
                let membershipId = splitted[splitted.length - 1];
                return membershipId;
            }
        }

        if (pageToken === 1) {
            pageToken = 0;
            continue;
        };

        //membership not found on this page, let's advance to the next one
        let newResponse = await fetch(`https://apis.roblox.com/cloud/v2/groups/${groupId}/memberships?maxPageSize=50&pageToken=${pageToken}`, {
            method: "GET",
            headers: {
                "x-api-key": apiKey
            }
        });

        if (!newResponse.ok) { //if it failed for whatever reason
            warn("Failed to retrieve subsequent pages. Error code:", newResponse.status);
            break;
        };

        let newData = await newResponse.json();
        pageToken = newData.nextPageToken || 1;
        currentPage = newData.groupMemberships;
    }
};

async function updateUserRole(targetMembershipId,groupId,apiKey) {
    let response = await fetch(`https://apis.roblox.com/cloud/v2/groups/${groupId}/join-requests/${targetMembershipId}:decline`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        },
        body: JSON.stringify({
            "role": `groups/${groupId}/join-requests/${targetMembershipId}`
        })
    });

    let data = await response.json();

    if (response.status !== 200) {
        return "拒绝失败,报错" + data.message;
    } else {
       return "拒绝成功，请检查群组";
    };
};

export async function updateRoleProces(userId, groupId, apiKey) {
    let membershipId = await getUserMembershipId(userId, groupId, apiKey);
    let g = await updateUserRole(membershipId,groupId,apiKey);
    return g;
};