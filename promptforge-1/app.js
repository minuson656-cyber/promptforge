// sendMessage() 내 response 루프
const reader = res.body.getReader();
while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = new TextDecoder().decode(value);
    // SSE 파싱 후 responseDiv에 추가
}
