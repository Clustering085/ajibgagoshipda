document.addEventListener('DOMContentLoaded', () => {
    const moodButtons = document.querySelectorAll('.mood-btn');
    const preferenceButtons = document.querySelectorAll('.preference-btn');
    const recommendButton = document.getElementById('recommend-btn');
    const recommendationBox = document.getElementById('recommendation');
    
    let selectedMood = null;
    let selectedPreference = null;

    // 메뉴 데이터베이스
    const menuDatabase = {
        happy: {
            korean: [
                { name: "삼겹살", description: "삼겹살 ㄱ?" },
                { name: "해물찜", description: "아니면 삼겹살 ㄱ?" }
            ],
            japanese: [
                { name: "초밥", description: "신선한 생선과 함께하는 특별한 날의 초밥!" },
                { name: "라멘", description: "진한 육수와 면의 조화가 기분 좋은 날을 더욱 특별하게 만들어줍니다." }
            ],
            chinese: [
                { name: "탕수육", description: "바삭한 탕수육과 함께하는 즐거운 식사 시간!" },
                { name: "마라탕", description: "매콤한 마라탕으로 기분을 더욱 상승시켜보세요!" }
            ],
            western: [
                { name: "스테이크", description: "특별한 날을 위한 고급스러운 스테이크!" },
                { name: "파스타", description: "알덴테 파스타와 와인의 조화가 좋은 기분을 더욱 특별하게 만들어줍니다." }
            ],
            fastfood: [
                { name: "치킨", description: "바삭한 치킨과 함께하는 즐거운 시간!" },
                { name: "피자", description: "다양한 토핑이 가득한 피자로 기분 좋은 날을 더욱 특별하게!" }
            ]
        },
        tired: {
            korean: [
                { name: "설렁탕", description: "ㅋ" },
                { name: "순대국", description: "아 배고 프다" }
            ],
            japanese: [
                { name: "우동", description: "따뜻한 우동으로 피로를 풀어보세요." },
                { name: "돈부리", description: "든든한 돈부리로 에너지를 충전하세요!" }
            ],
            chinese: [
                { name: "짬뽕", description: "매콤한 짬뽕으로 피로를 날려버리세요!" },
                { name: "볶음밥", description: "든든한 볶음밥으로 에너지를 충전하세요." }
            ],
            western: [
                { name: "리조또", description: "크리미한 리조또로 피로를 풀어보세요." },
                { name: "그라탕", description: "치즈가 듬뿍 들어간 그라탕으로 기운을 회복하세요!" }
            ],
            fastfood: [
                { name: "햄버거", description: "간편하게 즐기는 햄버거로 에너지를 충전하세요!" },
                { name: "치킨버거", description: "바삭한 치킨버거로 피로를 날려버리세요." }
            ]
        },
        stress: {
            korean: [
                { name: "매운탕", description: "매콤한 매운탕으로 스트레스를 날려버리세요!" },
                { name: "불고기", description: "달콤한 불고기로 마음을 달래보세요." }
            ],
            japanese: [
                { name: "돈까스", description: "바삭한 돈까스로 스트레스를 날려버리세요!" },
                { name: "규동", description: "달콤한 규동으로 마음을 달래보세요." }
            ],
            chinese: [
                { name: "마파두부", description: "매콤한 마파두부로 스트레스를 날려버리세요!" },
                { name: "깐풍기", description: "달콤한 깐풍기로 마음을 달래보세요." }
            ],
            western: [
                { name: "치즈버거", description: "치즈가 듬뿍 들어간 버거로 스트레스를 날려버리세요!" },
                { name: "마카로니앤치즈", description: "크리미한 마카로니앤치즈로 마음을 달래보세요." }
            ],
            fastfood: [
                { name: "핫도그", description: "간편하게 즐기는 핫도그로 스트레스를 날려버리세요!" },
                { name: "치킨윙", description: "매콤한 치킨윙으로 스트레스를 날려버리세요!" }
            ]
        },
        excited: {
            korean: [
                { name: "불고기", description: "신나는 날엔 달콤한 불고기로 기분을 더욱 상승시켜보세요!" },
                { name: "갈비찜", description: "달콤한 갈비찜으로 특별한 날을 더욱 특별하게!" }
            ],
            japanese: [
                { name: "초밥", description: "신나는 날엔 다양한 초밥으로 즐거운 시간을 보내세요!" },
                { name: "샤브샤브", description: "신선한 샤브샤브로 특별한 날을 더욱 특별하게!" }
            ],
            chinese: [
                { name: "깐풍기", description: "달콤한 깐풍기로 신나는 날을 더욱 특별하게!" },
                { name: "탕수육", description: "바삭한 탕수육으로 즐거운 시간을 보내세요!" }
            ],
            western: [
                { name: "피자", description: "다양한 토핑이 가득한 피자로 신나는 날을 더욱 특별하게!" },
                { name: "파스타", description: "알덴테 파스타로 즐거운 시간을 보내세요!" }
            ],
            fastfood: [
                { name: "치킨", description: "바삭한 치킨으로 신나는 날을 더욱 특별하게!" },
                { name: "핫도그", description: "간편하게 즐기는 핫도그로 즐거운 시간을 보내세요!" }
            ]
        },
        sad: {
            korean: [
                { name: "김치찌개", description: "우울한 날엔 따뜻한 김치찌개로 마음을 달래보세요." },
                { name: "된장찌개", description: "구수한 된장찌개로 마음을 위로해보세요." }
            ],
            japanese: [
                { name: "우동", description: "따뜻한 우동으로 마음을 달래보세요." },
                { name: "미소시루", description: "구수한 미소시루로 마음을 위로해보세요." }
            ],
            chinese: [
                { name: "짬뽕", description: "매콤한 짬뽕으로 우울한 마음을 날려버리세요!" },
                { name: "탕수육", description: "달콤한 탕수육으로 마음을 달래보세요." }
            ],
            western: [
                { name: "마카로니앤치즈", description: "크리미한 마카로니앤치즈로 마음을 달래보세요." },
                { name: "스파게티", description: "알덴테 스파게티로 마음을 위로해보세요." }
            ],
            fastfood: [
                { name: "치즈버거", description: "치즈가 듬뿍 들어간 버거로 마음을 달래보세요." },
                { name: "치킨", description: "바삭한 치킨으로 우울한 마음을 날려버리세요!" }
            ]
        }
    };

    // 기분 선택 이벤트
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            moodButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedMood = button.dataset.mood;
            updateRecommendButton();
        });
    });

    // 선호 음식 선택 이벤트
    preferenceButtons.forEach(button => {
        button.addEventListener('click', () => {
            preferenceButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedPreference = button.dataset.preference;
            updateRecommendButton();
        });
    });

    // 추천 버튼 상태 업데이트
    function updateRecommendButton() {
        recommendButton.disabled = !(selectedMood && selectedPreference);
    }

    // 메뉴 추천 함수
    function recommendMenu() {
        if (!selectedMood || !selectedPreference) {
            Swal.fire({
                title: '선택이 필요합니다!',
                text: '기분과 선호하는 음식 종류를 모두 선택해주세요.',
                icon: 'warning',
                confirmButtonText: '확인'
            });
            return;
        }

        const menus = menuDatabase[selectedMood][selectedPreference];
        const randomMenu = menus[Math.floor(Math.random() * menus.length)];

        recommendationBox.innerHTML = `
            <div class="menu-result">${randomMenu.name}</div>
            <div class="menu-description">${randomMenu.description}</div>
        `;

        // SweetAlert2로 결과 표시
        Swal.fire({
            title: '오늘의 추천 메뉴!',
            html: `
                <div class="text-4xl font-bold text-primary my-4">${randomMenu.name}</div>
                <p class="text-gray-600">${randomMenu.description}</p>
            `,
            imageUrl: `https://source.unsplash.com/300x200/?${randomMenu.name}`,
            imageWidth: 300,
            imageHeight: 200,
            imageAlt: randomMenu.name,
            confirmButtonText: '확인',
            confirmButtonColor: '#3085d6'
        });
    }

    // 추천 버튼 클릭 이벤트
    recommendButton.addEventListener('click', recommendMenu);
});