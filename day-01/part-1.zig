const std = @import("std");

pub fn main() !void {
    const input = @embedFile("./input.txt");
    std.debug.print("{}\n", .{try part1(input)});
}

fn part1(text: []const u8) !u64 {
    var iter = std.mem.split(u8, text, "\n");

    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var list_1 = std.ArrayList(u64).init(allocator);
    defer list_1.deinit();
    var list_2 = std.ArrayList(u64).init(allocator);
    defer list_2.deinit();
    var diff = std.ArrayList(u64).init(allocator);
    defer diff.deinit();

    while (iter.next()) |line| {
        var list_entries = std.mem.tokenize(u8, line, " ");

        var count: u64 = 0;
        while (list_entries.next()) |item| {
            if (count == 0) {
                const num = try std.fmt.parseInt(u64, item, 10);
                try list_1.append(num);
            } else if (count == 1) {
                const num = try std.fmt.parseInt(u64, item, 10);
                try list_2.append(num);
            }
            count += 1;
        }
    }
    std.mem.sort(u64, list_1.items, {}, std.sort.asc(u64));
    std.mem.sort(u64, list_2.items, {}, std.sort.asc(u64));
    for (list_1.items, 0..) |item, i| {
        const a: u64 = item;
        const b: u64 = list_2.items[i];

        const difference = if (a > b) a - b else b - a;
        try diff.append(difference);
    }
    var sum: u64 = 0;
    for (diff.items) |item| {
        sum += item;
    }
    return sum;
}

test "day-01-example-1" {
    const input = @embedFile("./test-1.txt");

    const result = try part1(input);
    try std.testing.expectEqual(11, result);
}
